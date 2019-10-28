import { Request, Response } from 'express'
import db from '../database'

class IndexController {
    
    public index(req: Request, res: Response) {
        res.send('La API Rest está funcionando')
    }

    public getVideo(req: Request, res: Response) {
        res.send('{[Esto vendría de la base de datos]}')
    }
}

export const indexController = new IndexController()