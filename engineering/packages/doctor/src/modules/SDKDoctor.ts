import * as fs from 'fs';
import * as path from 'path';
import { Diagnosis, DiagnosticStatus, IDoctorModule } from '../contracts/DoctorContracts';

export class SDKDoctor implements IDoctorModule {
  name = 'SDKDoctor';

  async diagnose(): Promise<Diagnosis> {
    const validations = [];
    let status: DiagnosticStatus = 'Healthy';

    const sdkManifestPath = path.resolve(__dirname, '../../../../packages/sdk/SDKManifest.json');
    if (fs.existsSync(sdkManifestPath)) {
      validations.push({ id: 'SDK_MANIFEST', name: 'SDK Manifest Exists', passed: true, message: 'OK' });
    } else {
      validations.push({ id: 'SDK_MANIFEST', name: 'SDK Manifest Exists', passed: false, message: 'Missing SDKManifest.json' });
      status = 'Fatal';
    }

    return {
      component: 'SDK',
      status,
      validations,
      recommendation: status !== 'Healthy' ? { id: 'FIX_SDK', message: 'Reinstall the SDK package.' } : undefined
    };
  }
}
