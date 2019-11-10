import { Router } from 'express'
import { reportesDocumentosController } from '../controllers/reportesDocumentosController'

class ReporteDocumentosRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/reporteDocumentos', reportesDocumentosController.getDocumentosDescargados)
    }
}

const reportesDocumentosRoutes = new ReporteDocumentosRoutes()
export default reportesDocumentosRoutes.router 