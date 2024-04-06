import * as AWS from 'aws-sdk';
import { Result } from "@domain/entities/result";
import { IRepositoryProduct } from "@domain/repository/productoRepository";
import { Product } from '@domain/entities/producto';

const s3 = new AWS.S3();

AWS.config.update({
    region: 'us-east-1'
  });
  
export class RepositoryS3 implements IRepositoryProduct {
    protected bucketName: string;

    constructor(bucketName: string) {
        this.bucketName = bucketName;
    }
    private removeTextoIndice(indice: string, patron: string): string {
        return indice.replace(new RegExp('^' + patron), '');
    }
    public async save(productCompress: Buffer, prodConv: Product): Promise<Result> {
        try {

            let textoARemover = 'bn_ripley_';
           
            //const prodConv = await this.convertBufferToProduct(product);
            const keyProduct =  "dynamo/" +
                                "cliente_id=" + prodConv.cliente_id +"/" +
                                "anio=" + prodConv.anio + "/" +
                                "mes=" + prodConv.mes.toString().padStart(2,'0') + "/" +
                                "dia=" + prodConv.dia.toString().padStart(2,'0') + "/" +
                                "tipo_producto=" + prodConv.tipo_producto + "/" +
                                "tipo_subproducto=" + prodConv.tipo_subproducto +"/" +
                                "custom01=" + prodConv.custom01 + "/" +
                                "custom02=" + prodConv.custom02 + "/" +
                                "custom03=" + prodConv.custom03 + "/" +
                                this.removeTextoIndice(prodConv.custom01, textoARemover)+ '-' + this.removeTextoIndice(prodConv.custom02,textoARemover) + '-' + this.removeTextoIndice(prodConv.custom03,textoARemover) + '.json.gz';

            console.log("key:", keyProduct);

            const misMetadatos = {
                'x-amz-meta-autor': 'rtalledo',
                'x-amz-meta-tipo_producto': prodConv.tipo_producto,
                'x-amz-meta-tipo_subproducto': prodConv.tipo_subproducto,
                'x-amz-meta-custom01': this.removeTextoIndice(prodConv.custom01,textoARemover),
                'x-amz-meta-custom02': this.removeTextoIndice(prodConv.custom02,textoARemover),
                'x-amz-meta-custom03': this.removeTextoIndice(prodConv.custom03,textoARemover),
            };
                
            const paramsS3: AWS.S3.PutObjectRequest = {
                Bucket: this.bucketName,
                Key: keyProduct,
                Body: productCompress,
                ContentLength: productCompress.length,
                ContentEncoding: 'gzip',
                ContentType: 'application/json',
                Metadata: misMetadatos
            } 

            const responseS3 = await s3.putObject(paramsS3).promise();
            console.log("response s3:", responseS3);
            
            const result: Result = {
                resume: responseS3.$response.data
            }
            return result;
        } catch (error: any) {
            console.error(error);
            throw new Error (error.message)
        }
    }

    private async convertBufferToProduct(product: Buffer): Promise<Product>{
        return new Promise<Product>((resolve, reject) =>{
            try{
                const datosProductoString = product.toString("utf-8");
                const productConvert: Product = JSON.parse(datosProductoString);
                resolve(productConvert);
            }catch(error: any){
                reject(error)
            }
             
        })
    }
   
    
}