const express = require('express')
const routes = express.Router()
const ProfileControllers = require('./controllers/ProfileControllers')
const JobControllers = require('./controllers/JobControllers')

//função que conta os dias restantes

routes.get('/', JobControllers.index)
routes.get('/job', JobControllers.create)
routes.post('/job', JobControllers.save)
routes.get('/job/:id', JobControllers.show)
routes.post('/job/:id', JobControllers.update)
routes.post('/job/delete/:id', JobControllers.delete)
routes.get('/profile', ProfileControllers.index)
routes.post('/profile', ProfileControllers.update)

module.exports = routes
//manda para fora
// 1 - Chamo novamente o express
// 2 - crio uma router numa const chamando o express.Router
// 2 - Crio uma rota com o router.het
//vou pegar esse router no serve.js com "const routes = require('./routes')"
