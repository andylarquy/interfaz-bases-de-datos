import { queryGetDocumentoConId } from '../queries/queries';
import { Request, Response } from 'express'
import db from '../database'
import '../queries/queries'

class BusquedaDocumentosController {

    public async getDocumentos(req: Request, res: Response) {
        const params = req.query

        let columna, orden
        if (params.sort) {
            [columna, orden] = params.sort.split(':')
        }

        const queryBusqueda =
        `SELECT idContenido, extension, titulo, fecha_de_publicacion, contenido
        FROM Contenido, Documentos
        WHERE Contenido.idContenido = Documentos.Contenido_idContenido
        AND (${db.escape(params.start)} IS NULL OR ${db.escape(params.end)} IS NULL) OR Contenido.fecha_de_publicacion BETWEEN ${db.escape(params.start)} AND ${db.escape(params.end)}
        AND (${db.escape(params.extension)} IS NULL OR Contenido.extension = ${db.escape(params.extension)})
        ORDER BY COALESCE(NULL, ${db.escape(columna)} ${db.escape(orden)})
        LIMIT ${db.escape(+params.skip)}, ${db.escape(+params.limit)}`


        // Traemos todos los campos de los contenidos que estan a su vez en la tabla documentos
        const a = await db.query(queryBusqueda,
            function (err, rows) {
                println(a.sql)
                if (err) {
                    println(err)
                    res.status(500).json({ status: 'error' });
                } else {
                    const documentos = rows;
                    res.json(documentos);
                }
            })

    }

    public async getDocumentoConId(req: Request, res: Response) {
        await db.query(queryGetDocumentoConId, req.params.id,
            function (err, rows) {
                if (err) {
                    res.send({ status: err.errno })
                } else {
                    const documentos = rows;
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

export const busquedaDocumentosController = new BusquedaDocumentosController
