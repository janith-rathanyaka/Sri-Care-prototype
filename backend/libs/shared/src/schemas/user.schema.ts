import { Schema, Document } from 'mongoose';
import { User } from '../interface/user.interface';

// Extend User with Mongoose Document
export interface UserDocument extends Omit<User, 'id'>, Document {
  _id: string;
}

export const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
