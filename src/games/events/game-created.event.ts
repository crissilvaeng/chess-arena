export class GameCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly white: string,
    public readonly black: string,
  ) {}
}
