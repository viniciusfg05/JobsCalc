const express = require('express')
const server = express()
const routes = require('./routes') //pegando o routes do routes.js

//Usar o req.body
server.use(express.urlencoded({ extended: true }))

//setando o EJS - Chmando ele
server.set('view engine', 'ejs')

server.use(express.static('public'))

//usa as rotas do routes
server.use(routes)

server.listen(3000, () => console.log('Projeto rodando'))
