import * as Knex from 'knex';
// tslint:disable-next-line
const knexfile = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const configuration = knexfile[environment];

export default Knex(configuration);
