import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Request, Response } from 'express'

import express from 'express'
import { AppRoutes, Route } from './routes'

console.log(`app start in ${ process.env.NODE_ENV } environment`)

createConnection()
    .then(async connection => {

        console.log(`database connected at ${ new Date() }: ${ connection.name }`)

        const app = express()
        const PORT = 8000

        AppRoutes.forEach((route: Route) => {
            app[route.method](route.path, (req: Request, res: Response, next) => {
                route.action(req, res)
                    .then(() => next)
                    .catch(err => next(err));
            })
        })

        app.listen(PORT, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
        })

    })
    .catch(error => console.log('TypeORM connection error: ', error));
