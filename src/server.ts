import express from 'express'
import bodyParser from 'body-parser'
import { log, requestLogger } from './services/logger'
import { router } from './routes'

export const startServer = (): void => {

    const app = express()
    const PORT = 8000

    app.use(requestLogger)

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.use(router)

    app.listen(PORT, () => {
        log.info(`⚡️[server]: Server is running at https://localhost:${PORT}`)
    })

}
