import { Router } from 'express'
import { modificarDocumentosController } from '../controllers/modificarDocumentosController'
import { busquedaDocumentosController } from '../controllers/busquedaDocumentosController'
import { descargasController } from '../controllers/descargasController'

class DescargasRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {

        //Parametros de url que acepta (extension, sort, start, y end)
        this.router.post('/descargas', descargasController.agregarDescarga)

    }
}

const descargasRoutes = new DescargasRoutes()
export default descargasRoutes.router
