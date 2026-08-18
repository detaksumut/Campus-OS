import { IMiddleware, ICommandContext } from './IMiddleware';

export class ExecutionPipeline {
  private middlewares: IMiddleware[] = [];

  public use(middleware: IMiddleware): void {
    this.middlewares.push(middleware);
  }

  public async execute(context: ICommandContext, finalHandler: () => Promise<any>): Promise<any> {
    let index = -1;
    
    const dispatch = async (i: number): Promise<any> => {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;

      if (i === this.middlewares.length) {
        return finalHandler();
      }

      const middleware = this.middlewares[i];
      return middleware.execute(context, () => dispatch(i + 1));
    };

    return dispatch(0);
  }
}
