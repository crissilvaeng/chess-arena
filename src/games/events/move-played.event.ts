export class MovePlayedEvent {
  constructor(
    public readonly id: string,
    public readonly move: string,
    public readonly player: string,
    public readonly position: string,
  ) {}
}
