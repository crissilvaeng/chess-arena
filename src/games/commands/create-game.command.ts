export class CreateGameCommand {
  constructor(
    public readonly gane: string,
    public readonly white: string,
    public readonly black: string,
  ) {}
}
