import { Router } from 'express'
import { modificarDocumentosController } from '../controllers/modificarDocumentosController'
import { busquedaDocumentosController } from '../controllers/busquedaDocumentosController'

class DocumentosRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {

        //Parametros de url que acepta (extension, sort, start, y end)
        this.router.get('/documentos', busquedaDocumentosController.getDocumentos)

        this.router.get('/documentos/:id', busquedaDocumentosController.getDocumentoConId)

        this.router.post('/documentos', modificarDocumentosController.crearDocumento)

        this.router.delete('/documentos/:id', modificarDocumentosController.bajaLogicaDocumento)

        this.router.put('/documentos/:id', modificarDocumentosController.actualizarDocumento)

    }
}

const documentosRoutes = new DocumentosRoutes()
export default documentosRoutes.router 
