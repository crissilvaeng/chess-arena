import { AggregateRoot } from '@nestjs/cqrs';
import { GameCreatedEvent } from '../events/game-created.event';

export class Game extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly white: string,
    private readonly black: string,
  ) {
    super();
  }
}
