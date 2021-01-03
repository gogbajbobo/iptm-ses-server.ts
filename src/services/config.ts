import config from 'nconf'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

config
    .file('../ses.config.json')

export const clientAppUrl = (): string => {

    const
        appname = 'client',
        netconf = `network:${ appname }`,
        protocol = config.get(`${ netconf }:protocol`),
        host = config.get(`${ netconf }:host`),
        port = config.get(`${ netconf }:port`),
        appBaseUrl = `${ protocol }://${ host }`

    return port ? `${ appBaseUrl }:${ port }/#` : `${ appBaseUrl }/#`
}

type ServerConfigType = {
    protocol: string
    host: string
    port: number
    serverType: string
}

export const serverConfig = (): ServerConfigType => {

    const
        servername = 'server',
        protocol = config.get(`network:${ servername }:protocol`),
        host = config.get(`network:${ servername }:host`),
        port = config.get(`network:${ servername }:port`),
        serverType = config.get('server')

    return { protocol, host, port, serverType }

}

export const dbConfig = (): MysqlConnectionOptions => {

    return {
        type: config.get('db:type'),
        host: config.get('db:host'),
        port: config.get('db:port'),
        username: config.get('db:username'),
        password: config.get('db:password'),
        database: config.get('db:database'),
        charset: config.get('db:charset'),
    }

}

type ClientConfigType = {
    protocol: string
    host: string
    port: number
}

const clientsConfig: ClientConfigType[] = config.get(`network:clients`)

export const allowedOrigins = Object.values(clientsConfig).map(config => {

    const { protocol, host, port } = config

    const baseOrigin = `${ protocol }://${ host }`
    return port ? `${ baseOrigin }:${ port }` : baseOrigin

})


export default config
