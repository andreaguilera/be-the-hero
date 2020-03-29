const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

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
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required()
  }).unknown(),
}), ProfileController.index)

routes.post('/sessions', SessionController.create)

//rota para listar as ONGS
routes.get('/ongs', OngController.index)
//rota para criação de uma ONG
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(13),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)

  }) 
}), OngController.create)

//rota para listar os CASOS(incident)
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index)
//rota para criação de um CASO(incident)
routes.post('/incidents', IncidentController.create)
//rota para deletar um CASO
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete)

  module.exports = routes