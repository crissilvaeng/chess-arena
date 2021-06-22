import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Move } from './move.schema';
import { Outcome } from './outcome.schema';
import { Player } from './player.schema';

export type GameDocument = Game & Document;

export enum GameStatus {
  Pending = 'Pending',
  Running = 'Running',
  Closed = 'Closed',
  Error = 'Error',
}

@Schema()
export class Game {
  @Prop({
    type: String,
  })
  _id: string;

  @Prop({
    type: Object,
    required: true,
  })
  white: Player;

  @Prop({
    type: Object,
    required: true,
  })
  black: Player;

  @Prop({
    type: String,
    enum: Object.keys(GameStatus),
    default: GameStatus.Pending,
  })
  status: string;

  @Prop({
    type: [{ type: Object }],
  })
  moves: Move[];

  @Prop({
    type: Object,
  })
  outcome: Outcome;
}

export const GameSchema = SchemaFactory.createForClass(Game);
