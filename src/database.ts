import 'reflect-metadata'
import { createConnection, ConnectionOptions, Connection } from 'typeorm'
import { isProduction } from './services/helper'
import { log } from './services/logger'
import { dbConfig } from './services/config'


const basePath = isProduction ? 'build' : 'src'

const connectionOptions: ConnectionOptions = {
    ...dbConfig(),
    synchronize: !isProduction,
    dropSchema: false,
    logging: [ 'error' ],
    maxQueryExecutionTime: 1000,
    entities: [ `${ basePath }/entity/*.{js,ts}` ],
    subscribers: [ `${ basePath }/subscriber/*.{js,ts}` ],
    migrations: [ `${ basePath }/migration/*.{js,ts}` ],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
}

export const connectDatabase = (): Promise<Connection> => {

    return createConnection(connectionOptions)
        .then(connection => {

            log.info(`Database connected at ${ new Date() }: ${ connection.name }`)
            return connection

        })
        .catch(error => Promise.reject(`Database connection error: ${ error }`))

}
