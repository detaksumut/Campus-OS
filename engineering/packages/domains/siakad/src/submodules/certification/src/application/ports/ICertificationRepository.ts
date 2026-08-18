import { CertificationApplication } from '../../domain/entities/CertificationApplication';
import { Certificate } from '../../domain/entities/Certificate';
import { ApplicationId, CertificateId } from '../../domain/value-objects/CertificationValueObjects';

export interface ICertificationRepository {
  saveApplication(application: CertificationApplication): Promise<void>;
  findApplicationById(id: ApplicationId): Promise<CertificationApplication | null>;
  
  saveCertificate(certificate: Certificate): Promise<void>;
  findCertificateById(id: CertificateId): Promise<Certificate | null>;
}
