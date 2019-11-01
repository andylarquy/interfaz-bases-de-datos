import { Router } from 'express'
import {indexController} from '../controllers/indexController'

class IndexRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        //Aca van a ir todas las llamadas a la api
        this.router.get('/',indexController.index)
        
        /* DOCUMENTOS */
        this.router.get('/documentos',indexController.getDocumentos)

        this.router.post('/documentos', indexController.crearDocumento)

        this.router.get('/documentos/:id',indexController.getDocumentoConId)
        
        this.router.delete('/documentos/:id', indexController.eliminarDocumento)

        this.router.put('/documentos/:id', indexController.actualizarDocumento)
    }
}

const indexRoutes = new IndexRoutes()
export default indexRoutes.router 