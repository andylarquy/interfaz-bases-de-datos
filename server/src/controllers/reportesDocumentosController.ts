import { Request, Response } from 'express'
import db from '../database'
import '../queries/queries'

class ReportesDocumentosController {

    public async getDocumentosDescargados(req: Request, res: Response) {
        const params = req.query
        console.log

        if (params.order === 'asc') {
            await getDocumentosMasDescargados(req, res)
        }

        if (params.order === 'desc') {
            await getDocumentosMenosDescargados(req, res)
        }

        if (!params.order) {
            res.status(500).json({ status: 'error' });
        }
    }
}

async function getDocumentosMenosDescargados(req: Request, res: Response) {
    const params = req.query
    params.order = params.order.replace("'", " ")
    console.log(params.order.replace("'", " "))

    const queryReporte = `
        SELECT
            idContenido, extension, titulo, fecha_de_publicacion, contenido, AVG(DescargaDocumento.velocidad_descarga) as velocidad_descarga
        FROM 
            Contenido
        INNER JOIN 
            Documentos ON Contenido.idContenido = Documentos.Contenido_idContenido
        INNER JOIN
             DescargaDocumento ON DescargaDocumento.Documentos_Contenido_idContenido = Documentos.Contenido_idContenido

        WHERE
           ( ( ${db.escape(params.start)} IS NULL
        OR 
            ${db.escape(params.end)} IS NULL )
        OR
            Contenido.fecha_de_publicacion >= ${db.escape(params.start)} AND Contenido.fecha_de_publicacion <= ${db.escape(params.end)} )

        GROUP BY
            idContenido

        ORDER BY
            velocidad_descarga ASC`

    const a = await db.query(queryReporte,
        function (err, rows) {
            println(a.sql)
            if (err) {
                println(err)
                res.status(500).json({ status: 'error' });
            } else {
                const documentos = rows;
                console.log(documentos)
                res.json(documentos);
            }
        })
}


async function getDocumentosMasDescargados(req: Request, res: Response) {
    const params = req.query
    params.order = params.order.replace("'", " ")
    console.log(params.order.replace("'", " "))

    const queryReporte = `
    SELECT
    idContenido, extension, titulo, fecha_de_publicacion, contenido, AVG(DescargaDocumento.velocidad_descarga) as velocidad_descarga
    FROM 
        Contenido
    INNER JOIN 
        Documentos ON Contenido.idContenido = Documentos.Contenido_idContenido
    INNER JOIN
         DescargaDocumento ON DescargaDocumento.Documentos_Contenido_idContenido = Documentos.Contenido_idContenido

    WHERE
       ( ( ${db.escape(params.start)} IS NULL
    OR 
        ${db.escape(params.end)} IS NULL )
    OR
        Contenido.fecha_de_publicacion >= ${db.escape(params.start)} AND Contenido.fecha_de_publicacion <= ${db.escape(params.end)} )

    GROUP BY
        idContenido

    ORDER BY
        velocidad_descarga DESC`

    const a = await db.query(queryReporte,
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



function println(any: any) {
    console.log('\n\n')
    console.log(any)
    console.log('\n\n')
}

export const reportesDocumentosController = new ReportesDocumentosController