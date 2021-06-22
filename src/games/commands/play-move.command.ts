import { Color } from '../constants';

export class PlayMoveCommand {
  constructor(public readonly game: string, public readonly player: Color) {}
}
