const connection = require('../database/connection')



module.exports = {

    //método para LISTAR os INCIDENTS que estão no banco que é chamado no routes.js
    async index (request, response) {
        const { page = 1 } = request.query

        //contador do total de casos
        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        //esquema de paginação limitando a mostrar 5 casos por vez
        .limit(5)
        .offset(( page - 1 ) * 5 )
        .select(['incidents.*',
                 'ongs.name',
                 'ongs.email',
                 'ongs.whatsapp',
                 'ongs.city',
                 'ongs.uf'
                ])

        //passando o contador pelo header da requisição
        response.header( 'X-Total-Count', count['count(*)'] )

        return response.json(incidents)
    
    },


    //método para CRIAR os INCIDENTS que estão no banco que é chamado no routes.js
    async create (request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },


    //método para deletar um INCIDENT
    async delete (request, response) {

        //pega o ID da ONG que está logada
        const { id } = request.params 
        const ong_id = request.headers.authorization

        //pega o incident que é pra ser deletado
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        //verifica se a ONG que está tentando deletar foi a mesma que criou o caso
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' })
        }
        //deleta o caso
        await connection('incidents').where('id', id).delete()

        return response.status(204).send()
    }
}