import { AggregateRoot } from '@nestjs/cqrs';

export class Game extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly white: string,
    public readonly black: string,
    public readonly moves?: string[],
  ) {
    super();
  }
}
