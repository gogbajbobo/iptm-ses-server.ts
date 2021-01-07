import { Request, Response, NextFunction } from 'express'
import { RouteInitializer, RouteActionResponse } from './interfaces'
import { allowedOrigins } from '../services/config'
import { log } from '../services/logger'

log.info(`Allowed client origins: ${ allowedOrigins }`)

export const corsRoutesInitializer: RouteInitializer = router => {

    router.route('*')
        .all((req: Request, res: Response, next: NextFunction): RouteActionResponse => {

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
