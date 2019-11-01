import { Request, Response } from 'express'
import db from '../database'

class IndexController {

    public index(req: Request, res: Response) {
        res.send('La API Rest está funcionando')
    }

    public async getDocumentos(req: Request, res: Response) {

        await db.query('SELECT * FROM Contenido', function (err, rows, fields) {
            if (err) throw err;
            const documentos = rows;
            res.json(documentos);
        });

    }

    public getDocumentoConId(req: Request, res: Response) {
        res.json({ text: 'Documento ' + req.params.id })
    }


    public async crearDocumento(req: Request, res: Response): Promise<void> {

        // Adapto el body del request del navegador a un
        // diccionario que me facilita manejar el JSON
        const body = req.body[0]

        //Separo en dos variables el JSON con la informacion respectiva a cada tabla
        let contenidos = { ...body }
        removerCamposDelJSON(contenidos, ["contenido"])

        const documentos = { ...body };
        removerCamposDelJSON(documentos, ['titulo', 'extension'])

        // Primero inicio una transaccion (para poder revertirla en caso de fallo)
        // y hago el insert en la tabla de contenidos
        await db.query('START TRANSACTION; INSERT INTO Contenido set ?;', [contenidos],
            function (err) {
                if (err) {
                    res.json({ status: 'error en primer import' }) //TODO: Mejorar codigo de error
                }
            })

        // Despues ejecutamos el segundo insert, pasandole el ID de LAST_INSERT_ID()
        //que asignó automaticamente la tabla anterior
        await db.query("INSERT INTO Documentos VALUES(?,LAST_INSERT_ID())", documentos["contenido"],
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

    public eliminarDocumento(req: Request, res: Response) {
        res.json({ text: 'Eliminando un documento ' + req.params.id })
    }

    public actualizarDocumento(req: Request, res: Response) {
        res.json({ text: 'Actualizando un documento ' + req.params.id })
    }


}

export const indexController = new IndexController()

function removerCamposDelJSON(json: any, campos: any[]): void {
    campos.forEach(campoARemover => {
        delete json[campoARemover]
    });
}
