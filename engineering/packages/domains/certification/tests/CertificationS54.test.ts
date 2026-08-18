import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { SchemeRuntime } from '../src/runtime/SchemeRuntime';
import { CertificateRuntime } from '../src/runtime/CertificateRuntime';
import { VerificationRuntime } from '../src/runtime/VerificationRuntime';
import { RenewalRuntime } from '../src/runtime/RenewalRuntime';
import { BadgeRuntime } from '../src/runtime/BadgeRuntime';
import { CertificateProjection } from '../src/projections/CertificateProjection';
import { SequentialCertificateNumberGenerator } from '../src/services/CertificateNumberGenerator';
import { PrerequisiteEngine } from '../src/policies/PrerequisiteEngine';
import { MembershipRuleProvider } from '../src/policies/RuleProviders';
import { PrerequisiteRule } from '../src/contracts';

const mockMembership = {
  getMembershipStatus: async (_: string) => ({ status: 'Active' }),
  getActiveTier: async (_: string) => ({ tierName: 'Scholar', tierLevel: 3 })
};

const prereqs: PrerequisiteRule = {
  id: 'root', name: 'All', type: 'COMPOSITE', priority: 1, operator: 'ALL',
  rules: [{ id: 'r1', name: 'Active', type: 'SIMPLE', priority: 1, providerId: 'membership', condition: '', metric: 'verificationStatus', operator: '==', threshold: 'Active' }]
};

async function buildCertContext() {
  const bus = new EventBus();
  const numberGen = new SequentialCertificateNumberGenerator('APS');
  const schemeRuntime = new SchemeRuntime(bus);
  const schemeId = await schemeRuntime.createScheme({
    name: 'Reviewer Cert', description: 'RC', version: '1.0', status: 'Draft',
    applicationPrerequisites: prereqs,
    assessmentComponents: [{ method: 'Exam', weight: 100, required: true, passingThreshold: 70, maxAttempts: 3, gradingMethod: 'Numeric' }],
    renewalPolicy: { validityMonths: 24, cpd: [], prerequisites: prereqs }
  });
  await schemeRuntime.activateScheme(schemeId);

  const certRuntime = new CertificateRuntime(
    numberGen,
    async (sid) => 'CERT',
    bus
  );
  const verificationRuntime = new VerificationRuntime(certRuntime);
  const engine = new PrerequisiteEngine([new MembershipRuleProvider(mockMembership as any, mockMembership as any)]);
  const renewalRuntime = new RenewalRuntime(certRuntime, schemeRuntime, engine, bus);
  const badgeRuntime = new BadgeRuntime();
  const projection = new CertificateProjection(certRuntime, verificationRuntime, schemeRuntime, badgeRuntime);

  return { bus, schemeRuntime, certRuntime, verificationRuntime, renewalRuntime, badgeRuntime, projection, schemeId };
}

describe('Certification - Sprint 5.4: Certificate, Verification & Renewal', () => {
  it('should produce certificate numbers in sequence', async () => {
    const gen = new SequentialCertificateNumberGenerator('APS');
    const n1 = await gen.generate('CERT', 2026);
    const n2 = await gen.generate('CERT', 2026);
    expect(n1).toBe('APS-CERT-2026-000001');
    expect(n2).toBe('APS-CERT-2026-000002');
  });

  it('should complete full Certificate lifecycle (Pending → Issued)', async () => {
    const { certRuntime, schemeId } = await buildCertContext();
    const certId = await certRuntime.initiate('holder_1', 'mem_1', schemeId, 'dec_1', 24);
    await certRuntime.generate(certId);
    await certRuntime.sign(certId, 'SHA256:abc123');
    await certRuntime.issue(certId);

    const cert = await certRuntime.getCertificate(certId);
    expect(cert?.state).toBe('Issued');
    expect(cert?.certificateNumber).toBe('APS-CERT-2026-000001');
    expect(cert?.version).toBe(1);
  });

  it('should verify a Valid issued certificate', async () => {
    const { certRuntime, verificationRuntime, schemeId } = await buildCertContext();
    const certId = await certRuntime.initiate('holder_2', 'mem_2', schemeId, 'dec_2', 24);
    await certRuntime.generate(certId);
    await certRuntime.sign(certId, 'sig_abc');
    await certRuntime.issue(certId);

    const cert = await certRuntime.getCertificate(certId);
    const report = await verificationRuntime.verifyCertificate(cert!.certificateNumber);
    expect(report.status).toBe('Valid');
    expect(report.holder?.membershipId).toBe('mem_2');
  });

  it('should report Revoked after revocation', async () => {
    const { certRuntime, verificationRuntime, schemeId } = await buildCertContext();
    const certId = await certRuntime.initiate('holder_3', 'mem_3', schemeId, 'dec_3', 24);
    await certRuntime.generate(certId); await certRuntime.sign(certId, 'sig'); await certRuntime.issue(certId);
    await certRuntime.revoke(certId, 'Misconduct');
    expect(await verificationRuntime.verifyStatus(certId)).toBe('Revoked');
  });

  it('should renew a certificate creating a new version and preserving history', async () => {
    const { certRuntime, renewalRuntime, schemeId } = await buildCertContext();
    const certId = await certRuntime.initiate('holder_4', 'mem_1', schemeId, 'dec_4', 24);
    await certRuntime.generate(certId); await certRuntime.sign(certId, 'sig'); await certRuntime.issue(certId);

    const renewalId = await renewalRuntime.initiateRenewal(certId, 'holder_4', 'mem_1', schemeId);
    await renewalRuntime.submitRenewal(renewalId);
    await renewalRuntime.beginRenewalReview(renewalId);
    const newCertId = await renewalRuntime.approveRenewal(renewalId, 'admin_1');

    const oldCert = await certRuntime.getCertificate(certId);
    const newCert = await certRuntime.getCertificate(newCertId);

    expect(oldCert?.state).toBe('Issued');       // Old cert untouched
    expect(newCert?.state).toBe('Issued');        // New cert issued
    expect(newCert?.version).toBe(2);             // Version incremented
    expect(newCert?.previousCertificateId).toBe(certId); // History preserved
  });

  it('should project certificate with QR code and verification URL', async () => {
    const { certRuntime, projection, schemeId } = await buildCertContext();
    const certId = await certRuntime.initiate('holder_5', 'mem_5', schemeId, 'dec_5', 24);
    await certRuntime.generate(certId); await certRuntime.sign(certId, 'sig'); await certRuntime.issue(certId);

    const dto = await projection.project(certId);
    expect(dto?.status).toBe('Valid');
    expect(dto?.verificationUrl).toContain('verify.campus-os.ac.id');
    expect(dto?.qrCodeData).toContain('certNumber');
    expect(dto?.metadata.projectionVersion).toBe('1.0');
  });

  it('should issue domain-agnostic badge for certification', async () => {
    const { badgeRuntime } = await buildCertContext();
    const defId = await badgeRuntime.registerBadgeDefinition({
      name: 'Certified Assessor', description: 'For certified assessors',
      domain: 'Certification', tier: 'Gold', criteria: 'Pass Reviewer Certification'
    });
    const issuedId = await badgeRuntime.issueBadge(defId, 'holder_1', 'mem_1', 'cert_1', 'Certification');
    const badges = await badgeRuntime.getBadgesForHolder('holder_1');
    expect(badges.length).toBe(1);
    expect(badges[0].issuedBadgeId).toBe(issuedId);
  });
});
