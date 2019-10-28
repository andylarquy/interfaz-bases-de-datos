import { Router } from 'express'

class IndexRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        //Aca van a ir todas las llamadas a la api
        this.router.get('/', (req, res) => res.send('La API Rest está funcionando'))
        
        //Ejemplo de get
        this.router.get('/videos/getVideo', (req, res) => res.send('{[Esto vendría de la base de datos]}'))
    }
}

const indexRoutes = new IndexRoutes()
export default indexRoutes.router 