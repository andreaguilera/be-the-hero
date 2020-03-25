const connection = require('../database/connection')

module.exports = {
    //método para criar uma sessão, ou seja, fazer login
    async create (request, response) {

        //pegando o ID do corpo da requisição
        const { id } = request.body

        //buscando a ONG no banco pelo ID
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first()

        //mensagem de erro caso não encontre
        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' })
        }

        //se der tudo certo retornar um JSON com os dados da ONG
        return response.json(ong)
    }
}