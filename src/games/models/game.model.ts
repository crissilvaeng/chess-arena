import { AggregateRoot } from '@nestjs/cqrs';
import { Outcome } from '../schemas/outcome.schema';

export class Game extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly white: string,
    public readonly black: string,
    public readonly status: string,
    public readonly moves?: string[],
    public readonly outcome?: Outcome,
    public readonly containers?: { [color: string]: string }
  ) {
    super();
  }
}
