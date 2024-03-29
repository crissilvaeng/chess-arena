import { Color } from '../constants';

export class CreatePlayerCommand {
  constructor(
    public readonly game: string,
    public readonly player: Color,
    public readonly image: string,
  ) {}
}
