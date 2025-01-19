import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class VAS extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  serviceId: string;

  @Prop({ required: true, enum: ['Active', 'Inactive'], default: 'Inactive' })
  status: string;

  @Prop()
  activationDate: number;

  @Prop()
  deactivationDate: number;

  @Prop({ required: true, enum: ['pre-pay', 'post-pay'], default: 'post-pay' })
  paymentType: string;

  @Prop({ required: true })
  cost: number;
}

export const VASSchema = SchemaFactory.createForClass(VAS);
