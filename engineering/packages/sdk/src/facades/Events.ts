import { SDKContext } from '../context/SDKContext';
import { IWorkflowRuntime } from '../../../kernel/src/contracts/IWorkflowRuntime'; // We might route events via workflow or observablity for now

export class Events {
  static async publish(eventName: string, payload: any): Promise<void> {
    console.log(`[Event] Published: ${eventName}`, payload);
  }

  static subscribe(eventName: string, handler: Function): void {
    console.log(`[Event] Subscribed to: ${eventName}`);
  }
}
