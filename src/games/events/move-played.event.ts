import { Color } from '../constants';

export class MovePlayedEvent {
  constructor(
    public readonly id: string,
    public readonly move: string,
    public readonly player: Color,
    public readonly position: string,
  ) {}
}
