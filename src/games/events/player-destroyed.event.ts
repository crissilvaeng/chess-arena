import { Color } from '../constants';

export class PlayerDestroyedEvent {
  constructor(
    public readonly id: string,
    public readonly move: string,
    public readonly player: Color,
    public readonly image: string,
    public readonly container: string,
  ) {}
}
