import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import indexRoutes from './routes/indexRoutes'
import documentosRoutes from './routes/documentosRoutes'
import promedioDocumentosRoutes from './routes/promedioDocumentosRoutes'
class Server {

    aplicacion: Application

    constructor() {
        this.aplicacion = express()
        this.config()
        this.routes()
    }

    config(): void {
        this.aplicacion.set('port', process.env.PORT || 3001)
        this.aplicacion.use(morgan('dev'))
        this.aplicacion.use(cors())
        this.aplicacion.use(express.json())
        this.aplicacion.use(express.urlencoded({ extended: false }))
    }

    routes(): void {
        this.aplicacion.use(indexRoutes)
        this.aplicacion.use(documentosRoutes)
        this.aplicacion.use(promedioDocumentosRoutes)
    }

    start(): void {
        try {
            this.aplicacion.listen(this.aplicacion.get('port'))
            console.log('API Rest Server on port ' + this.aplicacion.get('port'))
        } catch (error) {
            console.log('Hubo un error al levantar la API REST en el puerto ' + this.aplicacion.get('port'))
            throw new error
        }

    }
}

const server = new Server()
server.start()
