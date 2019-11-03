import { Router } from 'express'
import { modificarDocumentosController } from '../controllers/modificarDocumentosController'
import { busquedaDocumentosController } from '../controllers/busquedaDocumentosController'
import { indexController } from '../controllers/indexController'

class IndexRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        //Aca van a ir todas las llamadas a la api
        this.router.get('/', indexController.index)

        /* DOCUMENTOS */

        //Parametros de url que acepta (sort, skip y limit, start y end)
        this.router.get('/documentos', busquedaDocumentosController.getDocumentos)

        this.router.get('/documentos/:id', busquedaDocumentosController.getDocumentoConId)
        
        this.router.post('/documentos', modificarDocumentosController.crearDocumento)

        this.router.delete('/documentos/:id', modificarDocumentosController.eliminarDocumento)

        this.router.put('/documentos/:id', modificarDocumentosController.actualizarDocumento)
    }
}

const indexRoutes = new IndexRoutes()
export default indexRoutes.router 