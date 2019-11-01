import express, { Application } from 'express'
import indexRoutes from './routes/indexRoutes'
import morgan from 'morgan'
import cors from 'cors'
class Server {

    aplicacion: Application

    constructor() {
        this.aplicacion = express()
        this.config()
        this.routes()
    }

    config(): void {
        this.aplicacion.set('port', process.env.PORT || 3000)
        this.aplicacion.use(morgan('dev'))
        this.aplicacion.use(cors())
        this.aplicacion.use(express.json())
        this.aplicacion.use(express.urlencoded({extended: false}))
    }

    routes(): void {
        this.aplicacion.use('/',indexRoutes)
        this.aplicacion.use('/documentos',indexRoutes)
    }

    start(): void {
        this.aplicacion.listen(this.aplicacion.get('port')), () => {
            console.log('Server on port ' + this.aplicacion.get('port'))
        }
    }

}

const server = new Server()
server.start()