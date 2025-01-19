import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Bill', required: true })
  billId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['credit', 'debit'] })
  paymentMethod: string;

  @Prop({ required: true, enum: ['Success', 'Pending', 'Failed'], default: 'Pending' })
  status: string;

  @Prop()
  paymentDate:number;

  @Prop()
  transactionId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
