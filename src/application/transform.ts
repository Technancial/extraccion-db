import { Product } from "@domain/entities/producto";
import { IQueryable } from "@domain/entities/queryable";
import { IRepositoryProduct } from "@domain/repository/productoRepository";
import { ISourceRepository } from "@domain/source/sourceRepository";

import * as zlib from 'zlib';

export class Trasform {
    protected source: ISourceRepository;
    protected repository: IRepositoryProduct;

    constructor(source: ISourceRepository, repository: IRepositoryProduct) {
        this.source = source;
        this.repository = repository;
    }

    public async execute(query: IQueryable): Promise<void>{
        do {
            const products: Product[] = await this.source.load(query);
            console.log("productos cargados: ", products.length);

            for (const product of products) {
                this.processProduct(product);
            }
        } while (query.lastKey)
        
    }

    private async processProduct(product: Product): Promise<void>{
        console.log("producto analizar:", product.id, product.periodo);

        const partesFechaCorte = product.fecha_corte_string.split("-");
        if (partesFechaCorte.length !== 3) {
            throw new Error ("Fecha de corte mal formada");
        }
        const dia = parseInt(partesFechaCorte[0], 10);
        const mes = parseInt(partesFechaCorte[1], 10);
        const año = parseInt(partesFechaCorte[2], 10);

        if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
            throw new Error('Formato de fecha incorrecto');
        }
        product.anio = año;
        product.mes = mes;
        product.dia = dia;
        
        const productCompress = await this.compress(product);
        await this.repository.save(productCompress, product);
        await this.source.delete(product.id, product.periodo);
    }

    private async compress(product: Product): Promise<Buffer> {

        return new Promise<Buffer>((resolve, reject) => {
            zlib.gzip(Buffer.from(JSON.stringify(product)), (err, compressedData) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(compressedData);
                }
              });
        });
    }

}