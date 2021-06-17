import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { nanoid } from 'nanoid';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop({
    type: String,
  })
  _id: string;

  @Prop({
    type: String,
    required: true,
  })
  white: string;

  @Prop({
    type: String,
    required: true,
  })
  black: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
