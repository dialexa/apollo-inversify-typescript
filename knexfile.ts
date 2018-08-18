const environment = process.env.NODE_ENV || 'development';

const configuration = {
  charset: 'utf8',
  client: 'pg',
  debug: process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true' || false,
  pool: {
    min: 2,
    max: 10,
  },
  connection: {
    host: process.env.POSTGRES_HOST || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB_NAME || (environment === 'test') ? 'postgres_test' : 'postgres'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `./db/migrations`
  },
  seeds: {
    directory: `./db/seeds/${environment}`
  }
}

module.exports = configuration;
module.exports[environment] = configuration;
