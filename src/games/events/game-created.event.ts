export class GameCreatedEvent {
  constructor(
    public readonly gameId: string,
    public readonly whiteImage: string,
    public readonly blackImage: string,
  ) {}
}
