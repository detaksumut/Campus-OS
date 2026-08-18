export interface EvaluatePolicyCommand {
  policyId: string;
  context: Record<string, any>;
}

export interface PolicyEvaluationResult {
  isAllowed: boolean;
  reason?: string;
  violations?: string[];
}

export interface IPolicyEngine {
  evaluate(command: EvaluatePolicyCommand): Promise<PolicyEvaluationResult>;
}
