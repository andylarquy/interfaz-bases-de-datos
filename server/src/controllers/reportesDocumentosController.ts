import { Request, Response } from 'express'
import db from '../database'
import '../queries/queries'

class ReportesDocumentosController {

    public async getDocumentosDescargados(req: Request, res: Response) {
        const params = req.query

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

// ATENTO AL CODIGO REPETIDO
async function getDocumentosMenosDescargados(req: Request, res: Response) {
    const params = req.query

    const queryReporte = `
        SELECT
            idContenido, extension, titulo, fecha_de_publicacion,
            AVG(DescargaDocumento.velocidad_descarga) as velocidad_descarga,
            COUNT(DescargaDocumento.Documentos_Contenido_idContenido) as cantidad_descargas
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
            velocidad_descarga`

    const a = await db.query(queryReporte,
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

// ATENTO AL CODIGO REPETIDO
async function getDocumentosMasDescargados(req: Request, res: Response) {
    const params = req.query

    const queryReporte = `
    SELECT
    idContenido, extension, titulo, fecha_de_publicacion, AVG(DescargaDocumento.velocidad_descarga) as velocidad_descarga
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



function println(any: any) {
    console.log('\n\n')
    console.log(any)
    console.log('\n\n')
}

export const reportesDocumentosController = new ReportesDocumentosController()