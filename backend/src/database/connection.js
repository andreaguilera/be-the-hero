const knex = require('knex')
const configuration = require('../../knexfile')

//criando a conexão com o banco
const connection = knex(configuration.development)

module.exports = connection