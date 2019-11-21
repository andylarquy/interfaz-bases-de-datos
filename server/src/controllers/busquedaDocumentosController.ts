import { queryGetDocumentoConId } from '../queries/queries';
import { Request, Response } from 'express'
import db from '../database'
import '../queries/queries'

class BusquedaDocumentosController {

    public async getDocumentos(req: Request, res: Response) {
        const params = req.query

        const queryBusqueda = `
        SELECT
            idContenido, extension, titulo, fecha_de_publicacion
        FROM 
            Contenido, Documentos
        WHERE 
            Contenido.idContenido = Documentos.Contenido_idContenido
        AND
            Contenido.activo = 0
        AND
           ( ( ${db.escape(params.start)} IS NULL
        OR 
            ${db.escape(params.end)} IS NULL )
        OR
            Contenido.fecha_de_publicacion >= ${db.escape(params.start)} AND Contenido.fecha_de_publicacion <= ${db.escape(params.end)} )
        AND
           ( ${db.escape(params.extension)} IS NULL
        OR 
            Contenido.extension = ${db.escape(params.extension)} )`

        // Traemos todos los campos de los contenidos que estan a su vez en la tabla documentos
        const a = await db.query(queryBusqueda,
            (err, rows) => {
                if (err) {
                    println(err)
                    res.status(500).json({ status: 'error' });
                } else {
                    const documentos = rows;
                    console.log('\n')
                    res.json(documentos);
                }
            })
    }

    public async getDocumentoConId(req: Request, res: Response) {
        const a = await db.query(queryGetDocumentoConId, req.params.id,
            (err, rows) => {
                if (err) {
                    console.log('\n')
                    res.send({ status: err.errno })
                } else {
                    const documentos = rows;
                    console.log('\n')
                    res.json(documentos);
                }
            })
    }
}


function println(any: any) {
    console.log('\n\n')
    console.log(any)
    console.log('\n\n')
}

export const busquedaDocumentosController = new BusquedaDocumentosController()
