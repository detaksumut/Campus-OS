export class SearchRegistrationQuery {
  constructor(
    public readonly term?: string,
    public readonly status?: string,
    public readonly limit: number = 10,
    public readonly offset: number = 0
  ) {}
}
