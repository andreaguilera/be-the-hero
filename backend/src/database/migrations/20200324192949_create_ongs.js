//método do KNEX responsável pela criação da tabela
exports.up = function(knex) {

 return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
  })
  
};

//método do KNEX responsável por desfazer algo, no caso, deletar a tabela
exports.down = function(knex) {
  
   return knex.schema.dropTable('ongs')

};
