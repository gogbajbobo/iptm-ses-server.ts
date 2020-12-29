import { Request, Response, NextFunction } from 'express'
import { RouteInitializer } from './interfaces'

const allowedOrigins = [ 'http://localhost:8082' ]

export const corsRoutesInitializer: RouteInitializer = (router) => {

    router.route('*')
        .all((req: Request, res: Response, next: NextFunction) => {

            if (req.path === '/') {

                res.header('Access-Control-Allow-Origin', '*')

            } else {

                const reqOrigin = req.headers['origin']

                if (!allowedOrigins.includes(reqOrigin))
                    return res.status(403).send()

                res.header('Access-Control-Allow-Origin', reqOrigin)

            }

            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Content-type, Authorization')

            return req.method === 'OPTIONS'
                ? res.status(200).send()
                : next()

        })

}
