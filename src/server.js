const express = require('express')
const server = express()
const routes = require('./routes') //pegando o routes do routes.js
const path = require('path') //modulo paa mudar a pasta views

//Usar o req.body
server.use(express.urlencoded({ extended: true }))

//setando o EJS - Chmando ele
server.set('view engine', 'ejs')

//Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views')) //junta com __dirname, "views

server.use(express.static('public'))

//usa as rotas do routes
server.use(routes)

server.listen(3000, () => console.log('Projeto rodando'))
