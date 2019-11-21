import { Request, Response } from 'express'
import db from '../database'

class DescargasController {

    public async agregarDescarga(req: Request, res: Response) {
        const body = req.body
        const queryDescargas = `
        INSERT INTO DescargaDocumento
            (velocidad_descarga, Documentos_Contenido_idContenido)
        VALUE(
            ${db.escape(body.velocidad_descarga)},
            ${db.escape(body.idContenido)}
        );`

        const a = await db.query(queryDescargas,
            (err, rows) => {
                if (err) {
                    println(err)
                    res.status(500).json({ status: 'error' });
                } else {
                    console.log('\n')
                    res.json({ status: '200' })
                }
            })
    }
}

function println(any: any) {
    console.log('\n\n')
    console.log(any)
    console.log('\n\n')
}

export const descargasController = new DescargasController()
