import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OTP extends Document {
  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  expiry: Date;

  @Prop({ default: false })
  verified: boolean;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
