import { Color, Result, Termination } from '../constants';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Outcome {
  @Prop({
    type: String,
    enum: Object.keys(Termination),
  })
  termination?: Termination;

  @Prop({
    type: String,
    enum: Object.keys(Color),
  })
  winner?: string;

  @Prop({
    type: String,
    enum: Object.keys(Result),
    default: Result.Default,
  })
  result: string;
}
