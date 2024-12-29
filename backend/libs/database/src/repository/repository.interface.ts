import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class AbstractRepository<T> {
    abstract findAll(): Promise<T[]>;
    abstract findById(id: string): Promise<T | null>;
    abstract create(data: Partial<T>): Promise<T>;
    abstract update(id: string, data: Partial<T>): Promise<T | null>;
    abstract delete(id: string): Promise<boolean>;
    abstract findOne(query: Partial<T>): Promise<T | null>;
  }
  