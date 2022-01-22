const express = require('express')
const routes = express.Router()

const basePath = __dirname + '/views'

//Criando rotas
routes.get('/', (req, res) => res.sendFile(basePath + '/index.html'))
routes.get('/job', (req, res) => res.sendFile(basePath + '/job.html'))
routes.get('/job/edit', (req, res) => res.sendFile(basePath + '/job-edit.html'))
routes.get('/profile', (req, res) => res.sendFile(basePath + '/profile.html'))

module.exports = routes
//manda para fora
// 1 - Chamo novamente o express
// 2 - crio uma router numa const chamando o express.Router
// 2 - Crio uma rota com o router.het
//vou pegar esse router no serve.js com "const routes = require('./routes')"
