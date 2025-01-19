import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the nested object as a separate class
class Verification {
  @Prop({ default: false })
  mobileVerified: boolean;

  @Prop({ default: false })
  emailVerified: boolean;
}

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

  @Prop({ type: Verification, default: { mobileVerified: false, emailVerified: false } })
  verification: Verification;

  @Prop({ default: 'active' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
