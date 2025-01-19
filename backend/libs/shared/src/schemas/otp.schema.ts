import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Otp extends Document {
  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  expiresAt: number;

  @Prop({ default: false })
  isVerified: boolean;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
