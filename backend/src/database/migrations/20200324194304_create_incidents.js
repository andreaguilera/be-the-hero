//método do KNEX responsável pela criação da tabela
exports.up = function(knex) {

    return knex.schema.createTable('incidents', function (table) {
        //função do knex que já cria um id numérico que serve de primary key
       table.increments()

       table.string('title').notNullable()
       table.string('description').notNullable()
       table.decimal('value').notNullable()

       //campo que serve de chave estrangeira
       table.string('ong_id').notNullable()

       //referenciando a chave estrangeira da tabela ongs na tabela dos casos
       table.foreign('ong_id').references('id').inTable('ongs')
    })
     
   };
   
   //método do KNEX responsável por desfazer algo, no caso, deletar a tabela
   exports.down = function(knex) {
     
      return knex.schema.dropTable('incidents')
   
   };