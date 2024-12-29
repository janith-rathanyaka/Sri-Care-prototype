import { Schema, Document } from 'mongoose';
import { Customer } from '../interface/customer.interface';

// Extend User with Mongoose Document
export interface CustomerDocument extends Omit<Customer, 'id'>, Document {
    _id: string; 
  }

export const CustomerSchema = new Schema<CustomerDocument>({
  mobile: { type: String, required: true, unique: true },
  documentId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
