export class FinishGameCommand {
  constructor(public readonly game: string, public readonly moves: string[]) {}
}
