export interface ABIPlugin {
  manifest: any;
  routes?: any[];
  capabilities?: any;
  permissions?: any[];
  workbench?: any;
  widgets?: any[];
  forms?: any[];
  grids?: any[];
  actions?: any[];
}

export class PresentationCompiler {
  private supportedVersions = ['1.0.0', '1.1.0'];

  compile(pluginInput: ABIPlugin): any {
    if (!pluginInput.manifest || !pluginInput.manifest.id) {
      throw new Error("Invalid ABI: Missing manifest ID");
    }
    
    // ABI Version Negotiation
    const pluginVersion = pluginInput.manifest.version;
    if (!this.supportedVersions.includes(pluginVersion)) {
      throw new Error(`[ABI Negotiation Failed] Kernel does not support Plugin Version ${pluginVersion}. Supported: ${this.supportedVersions.join(', ')}`);
    }
    
    console.log(`[PresentationCompiler] ABI Version ${pluginVersion} Negotiated Successfully for ${pluginInput.manifest.id}`);
    
    return pluginInput;
  }
}
