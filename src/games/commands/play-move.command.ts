type Color = 'white' | 'black';

export class PlayMoveCommand {
  constructor(public readonly game: string, public readonly turn: Color) {}
}
