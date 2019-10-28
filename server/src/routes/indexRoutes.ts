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
        
        //Ejemplo de get
        this.router.get('/videos/getVideo', indexController.getVideo)
    }
}

const indexRoutes = new IndexRoutes()
export default indexRoutes.router 