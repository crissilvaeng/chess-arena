import { AggregateRoot } from '@nestjs/cqrs';

export class Game extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly white: string,
    private readonly black: string,
  ) {
    super();
  }
}
