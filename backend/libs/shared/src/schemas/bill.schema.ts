import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Bill extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  dueDate: number;

  @Prop({ required: true })
  generatedDate: number;

  @Prop({ required: true, enum: ['Paid', 'Unpaid'], default: 'Unpaid' })
  status: string;

  @Prop({
    type: [
      {
        description: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    default: [],
  })
  items: { description: string; amount: number }[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);
