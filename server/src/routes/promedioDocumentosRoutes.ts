import { Router } from 'express'
import { promedioDocumentosController } from '../controllers/promedioDocumentosController'

class PromedioDocumentosRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        //Parametros de url que acepta (start y end)
        this.router.get('/documentosPromedio', promedioDocumentosController.getPromedioDocumentos)
    }
}

const promedioDocumentosRoutes = new PromedioDocumentosRoutes()
export default promedioDocumentosRoutes.router 