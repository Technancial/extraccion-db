import { Product } from "@domain/entities/producto";
import { Result } from "@domain/entities/result";

export interface IRepositoryProduct {
    //save(product: Product): Promise<Result>;
    save(productCompress: Buffer, producto: Product): Promise<Result>;
}