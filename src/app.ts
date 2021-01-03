import { connectDatabase } from './database'
import { log } from './services/logger'
import { startServer } from './server'


log.info(`Server app start in ${ process.env.NODE_ENV } environment`)

connectDatabase()
    .then(startServer)
    .catch(log.error)
