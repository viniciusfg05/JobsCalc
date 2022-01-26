const sqlite3 = require('sqlite3')
const { open } = require('sqlite') // entre chave o javascript entende que queremos pegar apenas a funcionabilidade de open no sqlite

module.exports = () =>
  open({
    filename: './database.sqlite', //aquivo que os banco D. vai salvar a informações
    driver: sqlite3.Database
  })
