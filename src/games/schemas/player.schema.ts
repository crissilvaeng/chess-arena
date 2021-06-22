import { Prop, Schema } from '@nestjs/mongoose';

import { Color } from '../constants';

@Schema()
export class Player {
  @Prop({
    type: String,
    enum: Object.keys(Color),
    default: Color.White,
  })
  color: string;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: String,
  })
  container: string;
}
