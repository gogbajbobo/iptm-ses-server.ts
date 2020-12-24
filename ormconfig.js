const nodeEnv = process.env.NODE_ENV
const basePath =
    nodeEnv === 'production'
        ? 'build'
        : nodeEnv === 'development'
            ? 'src'
            : null

if (!basePath) console.warn(`You should set either 'production' or 'development' NODE_ENV value`)

console.log(`basePath: ${ basePath }`)

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    database: 'iptm_ses',
    synchronize: true,
    dropSchema: false,
    entities: [ `${ basePath }/entity/*.{js,ts}` ],
    subscribers: [ `${ basePath }/subscriber/*.{js,ts}` ],
    migrations: [ `${ basePath }/migration/*.{js,ts}` ],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
}
