import express from 'express'
import bodyParser from 'body-parser'
import { log, requestLogger } from './services/logger'
import passport from './services/passport'
import { router } from './routes'
import { serverConfig } from './services/config'

export const startServer = (): void => {

    const app = express()

    app.use(requestLogger)

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.use(passport.initialize())

    app.use(router)

    const { protocol, host, port} = serverConfig()

    log.info(`Server host: ${ protocol }://${ host }:${ port }`)

    app.listen(port, host, () => {

        const
            message = `Server listening at ${ new Date() }`

        log.info(message)

    })

}
