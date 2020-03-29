//importar o express
const express = require('express')
//importar o CORS
const cors = require('cors')
//importar as rotas
const routes = require('./routes')

const { errors } = require('celebrate')


//criar a aplicação
const app = express()

app.use(cors())
//informando para a aplicação que vamos usar JSON para as requisições
app.use(express.json())
//informando para a aplicação que vamos utilizar as rotas
app.use(routes)
app.use(errors());


/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação no back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 * 
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota(URL) após "?" (filtros, paginação...)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request body: Corpo da requisição, utilizado para criar ou alterar recursos
 * 
 */

//instanciando a primeira rota, para a homepage, toda função vai ter uma request e uma response


//colocar a aplicação pra rodar na porta 3333
module.exports = app