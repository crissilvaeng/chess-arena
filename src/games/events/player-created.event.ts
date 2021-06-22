export class PlayerCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly player: string,
    public readonly image: string,
    public readonly container: string,
  ) {}
}
