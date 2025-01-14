import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class VAS extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  serviceName: string;

  @Prop({ required: true, enum: ['Active', 'Inactive'], default: 'Inactive' })
  status: string;

  @Prop()
  activationDate: Date;

  @Prop()
  deactivationDate: Date;
}

export const VASSchema = SchemaFactory.createForClass(VAS);
