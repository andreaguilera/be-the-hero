const express = require('express')

//importando o OngController
const OngController = require('./controllers/OngController')
//importando o IncidentController
const IncidentController = require('./controllers/IncidentController')
//importando o ProfileController
const ProfileController = require('./controllers/ProfileController')
//importando o SessionController
const SessionController = require('./controllers/SessionController')

//separando o módulo de rotas do express para uma variável
const routes = express.Router()

//rota para listar os casos de uma ONG específica
routes.get('/profile', ProfileController.index)

routes.post('/sessions', SessionController.create)

//rota para listar as ONGS
routes.get('/ongs', OngController.index)
//rota para criação de uma ONG
routes.post('/ongs', OngController.create)

//rota para listar os CASOS(incident)
routes.get('/incidents', IncidentController.index)
//rota para criação de um CASO(incident)
routes.post('/incidents', IncidentController.create)
//rota para deletar um CASO
routes.delete('/incidents/:id', IncidentController.delete)

  module.exports = routes