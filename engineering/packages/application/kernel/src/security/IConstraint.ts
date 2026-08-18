import { ContextData } from '../context/ApplicationContext';
import { QueryBus } from '../bus/QueryBus';
import { RegistryRuntime } from '../registry/RegistryRuntime';

export interface ConstraintContext {
  applicationContext: ContextData;
  payload: any;
  queryBus: QueryBus;
  registry: RegistryRuntime;
}

export interface IConstraint {
  readonly constraintId: string;
  evaluate(context: ConstraintContext): Promise<boolean>;
}
