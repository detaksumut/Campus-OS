import { ICorrelationContext } from './ICorrelationContext';

export interface ISpan {
  spanId: string;
  finish(): void;
  setTag(key: string, value: string): void;
}

export interface ITracer {
  startSpan(name: string, context?: ICorrelationContext): ISpan;
}
