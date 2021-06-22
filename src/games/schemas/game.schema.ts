import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Player {
  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: String,
  })
  container: string;
}

@Schema()
export class Game {
  @Prop({
    type: String,
  })
  _id: string;

  @Prop({
    type: Player,
    required: true,
  })
  white: Player;

  @Prop({
    type: Player,
    required: true,
  })
  black: Player;

  @Prop({
    type: [{ type: String }],
  })
  moves: string[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
