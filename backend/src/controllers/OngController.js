//importando a conexão
const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {

    //método para LISTAR as ONGS que estão no banco que é chamado no routes.js
    async index (request, response) {

        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    
    },

    //método para CRIAR as ONGS que estão no banco que é chamado no routes.js
    async create(request, response) {

        const { name, email, whatsapp, city, uf } = request.body

        //gera um ID aleatório de tamanho 4 com caracteres hexadecimais
        const id = generateUniqueId()
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id })

    }
}