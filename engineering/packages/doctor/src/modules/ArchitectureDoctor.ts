import * as fs from 'fs';
import * as path from 'path';
import { Diagnosis, DiagnosticStatus, IDoctorModule } from '../contracts/DoctorContracts';

export class ArchitectureDoctor implements IDoctorModule {
  name = 'ArchitectureDoctor';

  async diagnose(): Promise<Diagnosis> {
    const validations = [];
    let status: DiagnosticStatus = 'Healthy';

    const iamPath = path.resolve(__dirname, '../../../../build/architecture/ArchitectureModel.json');
    const catalogPath = path.resolve(__dirname, '../../../../build/architecture/PlatformCatalog.json');

    if (fs.existsSync(iamPath) && fs.existsSync(catalogPath)) {
      validations.push({ id: 'IAM_EXISTS', name: 'IAM and Catalog Found', passed: true, message: 'OK' });
    } else {
      validations.push({ id: 'IAM_EXISTS', name: 'IAM and Catalog Found', passed: false, message: 'Missing Architecture Models' });
      status = 'Error';
    }

    return {
      component: 'ArchitectureModel',
      status,
      validations,
      recommendation: status !== 'Healthy' ? { 
        id: 'COMPILE_IAM', 
        message: 'The Architecture Model is missing or corrupted. You must recompile the blueprints.',
        actionCommand: 'campus architecture compile'
      } : undefined
    };
  }
}
