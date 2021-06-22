import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Outcome {
  @Prop({
    type: String,
  })
  termination?: string;

  @Prop({
    type: String,
  })
  winner?: string;

  @Prop({
    type: String,
  })
  result: string;
}
