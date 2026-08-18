export class TenantRuntime {
  async getTenantContext(userId: string) {
    return {
      organization: 'org_001',
      tenant: 'univ_001',
      workspace: 'ws_001',
      user: userId
    };
  }
}
