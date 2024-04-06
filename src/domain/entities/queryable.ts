
export interface IQueryable {
    tipo_producto: string,
    anio: number,
    mes: number,
    dia: number,
    tamanio_bloque: number,
    lastKey?: AWS.DynamoDB.Key
}