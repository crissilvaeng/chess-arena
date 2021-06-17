export class CreateGameCommand {
  constructor(
    public readonly game: string,
    public readonly white: string,
    public readonly black: string,
  ) {}
}
