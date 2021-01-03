import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { log } from './services/logger'
import { startServer } from './server'


log.info(`Server app start in ${ process.env.NODE_ENV } environment`)

createConnection()
    .then(async connection => {

        log.info(`Database connected at ${ new Date() }: ${ connection.name }`)
        startServer()

    })
    .catch(log.error)
