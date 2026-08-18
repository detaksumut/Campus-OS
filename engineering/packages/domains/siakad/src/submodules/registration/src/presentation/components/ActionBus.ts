export interface ActionBus {
  dispatch(actionId: string, payload?: any): void;
}

// Stub implementation for demonstration
export const useActionBus = (): ActionBus => {
  return {
    dispatch: (actionId: string, payload?: any) => {
      console.log(`[ActionBus] Dispatching ${actionId}`, payload);
      // In runtime, this will route to Action Runtime -> RegistrationApi
    }
  };
};
