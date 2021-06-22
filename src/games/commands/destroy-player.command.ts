import { Color } from '../constants';

export class DestroyPlayerCommand {
  constructor(
    public readonly game: string,
    public readonly player: Color,
  ) {}
}
