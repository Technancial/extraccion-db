import { Product } from "@domain/entities/producto";
import { IQueryable } from "@domain/entities/queryable";

export interface ISourceRepository {
    load(query: IQueryable): Promise<Product[]>;
    delete(id: string, periodo: number): Promise<void>;
}