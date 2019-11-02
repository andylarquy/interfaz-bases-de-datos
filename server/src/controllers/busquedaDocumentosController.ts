import { queryGetDocumentos, queryGetDocumentoConId } from '../queries/queries';
import { Request, Response } from 'express'
import db from '../database'
import '../queries/queries'

class BusquedaDocumentosController {

    public async getDocumentos(req: Request, res: Response) {
        let templateQuery = queryGetDocumentos
        templateQuery += getDocumentosFiltradosFecha(req, res)

        templateQuery += getDocumentosSort(req, res)
        templateQuery += getDocumentosPaginados(req, res)

        console.log('\n La query para pedir documentos resultante es: \n')
        console.log(templateQuery + '\n')
        // Traemos todos los campos de los contenidos que estan a su vez en la tabla documentos
        await db.query(templateQuery,
            function (err, rows) {
                if (err) {
                    res.send({ status: err.errno })
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

function getDocumentosPaginados(req: Request, res: Response) {

    if (req.query.skip && req.query.limit) {
        return '\n' + `LIMIT ${req.query.skip}, ${req.query.limit}`
    } else {
        return ''
    }
}

function getDocumentosSort(req: Request, res: Response) {

    const sortableColumns = ['idContenido', 'titulo', 'extension', 'fecha_de_publicacion'];

    if (req.query.sort) {
        console.log("le cabió")
        let [column, order] = req.query.sort.split(':')

        if (!sortableColumns.includes(column)) {
            throw new Error('Invalid "sort" column');
        }

        if (!order) {
            order = 'asc';
        }

        if (order !== 'asc' && order !== 'desc') {
            throw new Error('Invalid "sort" order');
        }

        return '\n' + `ORDER BY Contenido.${column} ${order}`
    } else {
        return ''
    }
}

function getDocumentosFiltradosFecha(req: Request, res: Response) {

    if (req.query.start && req.query.end) {
        //TODO: Validar que no hayan mandado fruta por la url
        return ` AND Contenido.fecha_de_publicacion BETWEEN '${req.query.start}' AND '${req.query.end}'`
    } else {
        return ''
    }

}

export const busquedaDocumentosController = new BusquedaDocumentosController()