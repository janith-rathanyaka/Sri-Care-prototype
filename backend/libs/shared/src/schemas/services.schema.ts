import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Services extends Document {
  @Prop({ required: true })
  serviceName: string;

  @Prop({ required: true , enum: ['voice', 'data' , 'tone', 'vas'], default: 'none' })
  serviceType: string;

  @Prop({ required: true , enum: ['limit', 'unlimited' , 'none'], default: 'none'  })
  type: string;

  @Prop({ required: false })
  amount: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true, enum: ['pre-pay', 'post-pay'], default: 'post-pay' })
  paymentType: string;

  @Prop({ required: true, enum: ['Active', 'Inactive'], default: 'Inactive' })
  status: string;

  @Prop()
  activationDate: Date;

  @Prop()
  deactivationDate: Date;
}

export const ServicesSchema = SchemaFactory.createForClass(Services);
