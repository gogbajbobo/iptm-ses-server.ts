import express, { Request, Response } from 'express'
import { log, requestLogger } from './services/logger'
import { AppRoutes, Route } from './routes'


export const startServer = (): void => {

    const app = express()
    const PORT = 8000

    app.use(requestLogger)

    AppRoutes.forEach((route: Route) => {

        app[route.method](route.path, (req: Request, res: Response, next) => {
            route.action(req, res)
                .then(() => next)
                .catch(err => next(err));
        })
    })

    app.listen(PORT, () => {
        log.info(`⚡️[server]: Server is running at https://localhost:${PORT}`)
    })

}
