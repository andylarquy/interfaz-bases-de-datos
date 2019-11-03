import { Request, Response } from 'express'
import db from '../database'

class ProemdioDocumentosController {

    public async getPromedioDocumentos(req: Request, res: Response) {
        const params = req.query
        const queryPromedioDocumentos = `
        SELECT
            AVG(DescargaDocumento.velocidad_descarga) as promedio_velocidad
        FROM 
            DescargaDocumento, Documentos, Contenido
        WHERE
            DescargaDocumento.Documentos_Contenido_idContenido = Contenido.idContenido
        AND 
            Contenido.idContenido = Documentos.Contenido_idContenido
        AND
            ( Contenido.fecha_de_publicacion >= ${db.escape(params.start)} OR ${db.escape(params.start)} IS NULL )
        AND
            ( Contenido.fecha_de_publicacion <= ${db.escape(params.end)} OR ${db.escape(params.end)} IS NULL )`

        const a = await db.query(queryPromedioDocumentos,
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
}

function println(any: any) {
    console.log('\n\n')
    console.log(any)
    console.log('\n\n')
}

export const promedioDocumentosController = new ProemdioDocumentosController
