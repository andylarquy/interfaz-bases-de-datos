import { Request, Response } from 'express'
import db from '../database'

class IndexController {

    public index(req: Request, res: Response) {
        res.send('La API Rest está funcionando')
    }
}

export const indexController = new IndexController()