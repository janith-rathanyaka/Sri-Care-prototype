import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { AbstractRepository } from './repository.interface';

@Injectable()
export class MongoRepository<T extends Document> extends AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {
    super();
  }

  async findAll(filter: Record<string, any> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(query: any): Promise<T | null> {
    return this.model.findOne(query).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const createdDocument = new this.model(data);
    return createdDocument.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: any): Promise<boolean> {
    const result = await this.model.deleteOne(id).exec();
    return !!result;
  }
  
}
