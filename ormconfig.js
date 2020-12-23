const basePath = process.env.NODE_ENV === 'development' ? 'src' : 'build'

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
