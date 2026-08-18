import * as fs from 'fs';
import * as path from 'path';
import { DiagnosticStatus, DoctorReport, IDoctorModule, Diagnosis } from './contracts/DoctorContracts';
import { SDKDoctor } from './modules/SDKDoctor';
import { ArchitectureDoctor } from './modules/ArchitectureDoctor';
import { TemplateDoctor } from './modules/TemplateDoctor';

export class DoctorRuntime {
  private modules: Map<string, IDoctorModule> = new Map();

  constructor() {
    this.registerModule(new SDKDoctor());
    this.registerModule(new ArchitectureDoctor());
    this.registerModule(new TemplateDoctor());
  }

  registerModule(module: IDoctorModule) {
    this.modules.set(module.name, module);
  }

  async runAll(): Promise<DoctorReport> {
    return this.runModules(Array.from(this.modules.values()));
  }

  async runSpecific(moduleName: string): Promise<DoctorReport> {
    const mod = this.modules.get(moduleName);
    if (!mod) throw new Error(`Diagnostic module [${moduleName}] not found.`);
    return this.runModules([mod]);
  }

  private async runModules(modules: IDoctorModule[]): Promise<DoctorReport> {
    const diagnoses: Diagnosis[] = [];
    let globalStatus: DiagnosticStatus = 'Healthy';

    for (const mod of modules) {
      const diagnosis = await mod.diagnose();
      diagnoses.push(diagnosis);

      // Elevate global status based on severity
      if (diagnosis.status === 'Fatal') globalStatus = 'Fatal';
      else if (diagnosis.status === 'Error' && globalStatus !== 'Fatal') globalStatus = 'Error';
      else if (diagnosis.status === 'Warning' && globalStatus === 'Healthy') globalStatus = 'Warning';
    }

    const report: DoctorReport = {
      status: globalStatus,
      timestamp: new Date().toISOString(),
      diagnoses
    };

    const outPath = path.resolve(__dirname, '../../../build/diagnostics/DoctorReport.json');
    if (!fs.existsSync(path.dirname(outPath))) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
    }
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

    return report;
  }

  static getExitCode(status: DiagnosticStatus): number {
    switch (status) {
      case 'Healthy': return 0;
      case 'Warning': return 1;
      case 'Error': return 2;
      case 'Fatal': return 3;
      default: return 3;
    }
  }
}
