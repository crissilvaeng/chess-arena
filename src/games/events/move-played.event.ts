type Color = 'white' | 'black';

export class MovePlayedEvent {
  constructor(
    public readonly game: string,
    public readonly player: Color,
    public readonly move: string,
  ) {}
}
