export interface PresentationABI {
  version: string;
  compiledAt: string;
  modules: Record<string, CompiledModule>;
}

export interface CompiledModule {
  id: string;
  name: string;
  capabilities: string[];
  permissions: string[];
  routes: CompiledRoute[];
  workbenches: CompiledWorkbench[];
  widgets: CompiledWidget[];
}

export interface CompiledRoute {
  id: string;
  path: string;
  workbenchId: string;
  children?: CompiledRoute[];
}

export interface CompiledWorkbench {
  id: string;
  layoutId: string;
}

export interface CompiledWidget {
  id: string;
  componentRef: string;
  placement: string;
  requiredCapabilities: string[];
}
