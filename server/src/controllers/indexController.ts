import { queryGetDocumentos, insertAContenidos, insertADocumentos, queryGetDocumentoConId, updateAContenidos, updateADocumentos } from '../queries/queries';
import { Request, Response } from 'express'
import db from '../database'
import '../queries/queries'

class IndexController {

    public index(req: Request, res: Response) {
        res.send('La API Rest está funcionando')
    }

    public async getDocumentos(req: Request, res: Response) {
        // Traemos todos los campos de los contenidos que estan a su vez en la tabla documentos
        await db.query(queryGetDocumentos,
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

    // TODO: Revisar si se puede encapsular codigo
    public async crearDocumento(req: Request, res: Response): Promise<void> {

        // Adapto el body del request del navegador a un
        // diccionario que me facilita manejar el JSON
        const body = req.body[0]

        //Separo en dos variables el JSON con la informacion respectiva a cada tabla
        const contenidos = { ...body }
        removerCamposDelJSON(contenidos, ["contenido"])

        const documentos = { ...body };
        removerCamposDelJSON(documentos, ['titulo', 'extension'])

        // Primero inicio una transaccion (para poder revertirla en caso de fallo)
        // y hago el insert en la tabla de contenidos
        await db.query(insertADocumentos, [contenidos],
            function (err) {
                if (err) {
                    res.json({ status: 'error en primer import' }) //TODO: Mejorar codigo de error
                }
            })

        // Despues ejecutamos el segundo insert, pasandole el ID de LAST_INSERT_ID()
        //que asignó automaticamente la tabla anterior
        await db.query(insertAContenidos, documentos["contenido"],
            async function (err) {
                if (!err) {
                    await db.query('COMMIT;')
                    res.json({ status: '200' })
                } else {
                    await db.query('ROLLBACK;')
                    res.json({ status: 'error en segundo insert' })//TODO: Mejorar codigo de error
                }
            })
    }


    public async actualizarDocumento(req: Request, res: Response) {
        const body = req.body[0]

        await db.query(updateAContenidos, [body["titulo"], req.params.id],
            function (err) {
                if (!err) {
                    console.log('Se actualizó un elemento de la tabla Contenidos')
                } else {
                    console.log('Hubo un error al actualizar un elemento de la tabla Contenidos')
                    res.json({ status: 'error' })
                }
            })

        await db.query(updateADocumentos, [body["contenido"], req.params.id],
            async function (err) {
                if (!err) {
                    await db.query('COMMIT;')
                    console.log('Se actualizó un elemento de la tabla Documentos, se commitean los cambios')
                    res.json({ status: '200' })
                } else {
                    await db.query('ROLLBACK;')
                    console.log('Hubo un error al actualizar un elemento de la tabla Documentos, se hace rollback de los cambios')
                    res.json({ status: 'error' })
                }
            })
    }


    // res.json({ text: 'Actualizando un documento ' + req.params.id })

    public eliminarDocumento(req: Request, res: Response) {
        res.json({ text: 'Eliminando un documento ' + req.params.id })
    }
}

export const indexController = new IndexController()

function removerCamposDelJSON(json: any, campos: any[]): void {
    campos.forEach(campoARemover => {
        delete json[campoARemover]
    });
}
