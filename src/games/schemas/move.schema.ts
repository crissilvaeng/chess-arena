import { Prop, Schema } from '@nestjs/mongoose';

import { Color } from '../constants';

@Schema()
export class Move {
  @Prop({
    type: String,
  })
  move: string;

  @Prop({
    type: String,
    enum: Object.keys(Color),
    default: Color.White,
  })
  turn: string;

  @Prop({
    type: String,
  })
  position: string;
}
