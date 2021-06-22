export class GameFinishedEvent {
  constructor(
    public readonly id: string,
    public readonly winner: string,
    public readonly termination: string,
    public readonly result: string,
  ) {}
}
