import config from 'nconf'

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

export default config
