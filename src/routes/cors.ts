import { Request, Response, NextFunction } from 'express'
import { RouteActionResponse, Route } from './interfaces'
import { allowedOrigins } from '../services/config'
import { log } from '../services/logger'

log.info(`Allowed client origins: ${ allowedOrigins }`)

const corsInit = (req: Request, res: Response, next: NextFunction): RouteActionResponse => {

    log.info(`req.headers: ${ JSON.stringify(req.headers, null, '\t')}`)

    if (req.path === '/') {

        res.header('Access-Control-Allow-Origin', '*')

    } else {

        const reqOrigin = req.headers['origin']

        if (!allowedOrigins.includes(reqOrigin))
            return res.status(403).send(`allowedOrigins do not includes ${ reqOrigin }`)

        res.header('Access-Control-Allow-Origin', reqOrigin)

    }

    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization')

    return req.method === 'OPTIONS'
        ? res.status(200).send()
        : next()

}

const routes: Route[] = [
    {
        path: '*',
        method: 'all',
        actions: [ corsInit ]
    }
]

export default routes
