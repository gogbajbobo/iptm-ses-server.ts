import express, { Request, Response } from 'express'
import { log, requestLogger } from './services/logger'
import { AppRoutes, Route } from './routes'


export const startServer = (): void => {

    const app = express()
    const PORT = 8000

    app.use(requestLogger)

    AppRoutes.forEach((route: Route) => {

        const { method, action, path } = route

        app[method](path, (req: Request, res: Response, next) => {
            action(req, res)
                .then(next)
                .catch(next)
        })

    })

    app.listen(PORT, () => {
        log.info(`⚡️[server]: Server is running at https://localhost:${PORT}`)
    })

}
