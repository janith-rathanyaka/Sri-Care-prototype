import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ unique: true })
  email?: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  customerId?: string; // Only for existing customers

  @Prop({ required: true, enum: ['existing', 'new'] })
  registrationType: string;

  @Prop({ default: { mobileVerified: false, emailVerified: false } })
  verification: {
    mobileVerified: boolean;
    emailVerified: boolean;
  };

  @Prop({ type: [String], default: [] })
  services: string[];

  @Prop({ default: 'active' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
