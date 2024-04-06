import { Product } from "@domain/entities/producto";
import { IQueryable } from "@domain/entities/queryable";
import { ISourceRepository } from "@domain/source/sourceRepository";

import * as AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1'
  });
export class SourceDynamo implements ISourceRepository {
    protected dynamodb;
    protected tableName: string;
    protected indexName: string;

    constructor(tableName: string, indexName: string) {
        this.dynamodb = new AWS.DynamoDB(); 
        this.tableName = tableName;
        this.indexName = indexName;
    }

    private async queryIndexDynamoDB(query: IQueryable): Promise<AWS.DynamoDB.QueryOutput> {
        const periodo = `${query.anio}${query.mes}`
        const params: AWS.DynamoDB.QueryInput = {
            TableName: this.tableName,
            IndexName: this.indexName,
            KeyConditionExpression: "#tipo_producto = :ID AND #periodo = :ORDEN",
            ExpressionAttributeNames: {
                '#tipo_producto': 'tipo_producto',
                '#periodo': 'periodo'
            },
            ExpressionAttributeValues: {
                ':ID': {"S": query.tipo_producto},
                ':ORDEN': {"N": periodo.toString()}
            },
            Limit: query.tamanio_bloque
        }

        if (query.lastKey){
            params.ExclusiveStartKey = query.lastKey;
        }

        console.log("params dynamo:", params);
        return await this.dynamodb.query(params).promise();
    }

    public async load(query: IQueryable): Promise<Product[]> {

        const results = await this.queryIndexDynamoDB(query);
        query.lastKey = results.LastEvaluatedKey;
        const items = results.Items;

        const products: Product[] = [];
        return new Promise<Product[]>((resolve, reject) => {
            try {
                if (items) {
                    for (const item of items) {
                        const jsonItem = AWS.DynamoDB.Converter.unmarshall(item);
                        const prod = jsonItem as Product;
                        products.push(prod);
                    }
                    resolve(products);
                }
            }catch (error: any) {
                reject(error);
            }
        })
        
    }
    public async delete(id: string, periodo: number): Promise<void> {
        const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: {
                id: {"S": id},
                periodo: {"N": periodo.toString()}
            }
        }       
        console.log("params delete", params);
        const resultDelete = await this.dynamodb.deleteItem(params).promise();
        console.log("Eliminar registro:", resultDelete);
    }
    
}