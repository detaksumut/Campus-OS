import { CertificationRuntime } from '../../../certification/src/CertificationRuntime';
import { ScoreDimensions } from '../../../certification/src/contracts/CertificationContracts';

export async function executeCertify(target: string) {
  console.log(`\n🏆 Campus Certification Engine`);
  console.log(`Target: ${target}\n`);

  try {
    const runtime = new CertificationRuntime();
    
    // Mock dimensions for different targets to simulate varying maturity
    let dimensions: ScoreDimensions = {
      architecture: 100, governance: 100, testing: 100,
      documentation: 100, security: 100, compatibility: 100, determinism: 100
    };

    if (target === 'CLI') {
       dimensions.testing = 80; // simulate B grade
    }

    const cert = await runtime.certifyTarget(target, dimensions);
    
    console.log(`Certificate Issued: ${cert.certificateId}`);
    console.log(`Maturity: [${cert.score.maturity}]`);
    console.log(`Grade: ${cert.score.grade} (${cert.score.numeric}/100)`);
    console.log(`Hash: ${cert.signature.hash}`);
    
    if (cert.recommendations.length > 0) {
      console.log(`\nRecommendations:`);
      cert.recommendations.forEach(r => console.log(` - ${r}`));
    }

    console.log(`\nCertificate registered in PlatformCertificateIndex.json`);
  } catch (err) {
    console.error('Certification Failed:', err);
    process.exit(1);
  }
}
