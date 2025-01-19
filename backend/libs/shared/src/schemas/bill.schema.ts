import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Bill extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  dueDate: number;

  @Prop({ required: true })
  generatedDate: number;

  @Prop({ required: true, enum: ['Paid', 'Unpaid'], default: 'Unpaid' })
  status: string;
  
  @Prop({ required: false })
  vasId?: string;

  @Prop({ required: false })
  transactionId: string;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
