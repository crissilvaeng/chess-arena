import { Color } from '../constants';

export class PlayerCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly player: Color,
    public readonly image: string,
    public readonly container: string,
  ) {}
}
