
import { Trasform } from "@application/transform";
import { RepositoryS3 } from "./database/repository"
import { SourceDynamo } from "./dynamo/source-dynamo";
import { IQueryable } from "@domain/entities/queryable";

const repositoryS3 = new RepositoryS3("pe.soapros.glue");
const sourceDynamo = new SourceDynamo("capacniam-producto-prd", "tipo_producto-periodo-index");
const execute = async() => {
    const transform = new Trasform(sourceDynamo, repositoryS3);
    const query: IQueryable = {
        tipo_producto: '10',
        anio: 2019,
        mes: 12,
        dia: 1,
        tamanio_bloque: 20
    }
    transform.execute(query);
}
execute();