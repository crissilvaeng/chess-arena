import { Color, Result, Termination } from '../constants';

export class GameFinishedEvent {
  constructor(
    public readonly id: string,
    public readonly winner: Color,
    public readonly termination: Termination,
    public readonly result: Result,
  ) {}
}
