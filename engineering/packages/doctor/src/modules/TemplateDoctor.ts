import * as fs from 'fs';
import * as path from 'path';
import { Diagnosis, DiagnosticStatus, IDoctorModule } from '../contracts/DoctorContracts';

export class TemplateDoctor implements IDoctorModule {
  name = 'TemplateDoctor';

  async diagnose(): Promise<Diagnosis> {
    const validations = [];
    let status: DiagnosticStatus = 'Healthy';

    const certPath = path.resolve(__dirname, '../../../../packages/cli/templates/TemplateCertificate.json');

    if (fs.existsSync(certPath)) {
      validations.push({ id: 'TPL_CERT', name: 'Template Certificate Valid', passed: true, message: 'OK' });
    } else {
      validations.push({ id: 'TPL_CERT', name: 'Template Certificate Valid', passed: false, message: 'Missing TemplateCertificate.json. Provenance broken.' });
      status = 'Warning';
    }

    return {
      component: 'Templates',
      status,
      validations,
      recommendation: status !== 'Healthy' ? { 
        id: 'REGENERATE_TPL', 
        message: 'Template provenance is broken. Regenerate templates from the IAM.',
        actionCommand: 'campus architecture compile'
      } : undefined
    };
  }
}
