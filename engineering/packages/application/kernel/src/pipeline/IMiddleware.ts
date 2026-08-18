import { ApplicationContext } from '../context/ApplicationContext';

export interface ICommandContext {
  commandId: string;
  payload: any;
  appContext?: typeof ApplicationContext.current;
}

export interface IMiddleware {
  execute(context: ICommandContext, next: () => Promise<any>): Promise<any>;
}
