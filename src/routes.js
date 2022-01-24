const express = require('express')
const routes = express.Router()
const views = __dirname + '/views/'

const profile = {
  name: 'Vinicius',
  avatar: 'https://avatars.githubusercontent.com/u/68232658?v=4',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 6,
  'vacation-per-year': 4,
  'value-hours': 75
}

//Estrutura de dados jobs
const jobs = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 50,
    created_at: Date.now()
  },
  {
    id: 2,
    name: 'OneTwo Project',
    'daily-hours': 5,
    'total-hours': 60,
    created_at: Date.now()
  }
]

//função que conta os dias restantes
function remainingDays(job) {
  const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed() //toFixed() - para arredondar o numero

  const createdDate = new Date(job.created_at) //data de criação do projeto
  const dueDay = createdDate.getDate() + Number(remainingDays) //soma a data da criação com os dias restantes
  const dueDateInMs = createdDate.setDate(dueDay) //data do futuro data de vencimento

  const timeDiffInMs = dueDateInMs - Date.now() //dia restante ou vencimento - a data de agora
  const dayInMs = 1000 * 60 * 60 * 24 //transformando milli em dias
  const dayDiff = Math.ceil(timeDiffInMs / dayInMs) //Math.floor - apara arredondar para baixo //

  return dayDiff
}

//GET
routes.get('/', (req, res) => {
  //
  const updatedJobs = jobs.map(job => {
    //
    const remaining = remainingDays(job) //usando a função que conta os dias restantes
    const status = remaining <= 0 ? 'done' : 'progress'

    return {
      ...job,
      remaining,
      status,
      budget: profile['value-hours'] * job['total-hours'] //valor da minha hora
    }
  })

  return res.render(views + 'index', { jobs: updatedJobs }) //agora o valor de jobs é uptadedjobs
})

//

routes.get('/job', (req, res) => res.render(views + 'job'))
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'))

routes.get('/profile', (req, res) =>
  res.render(views + 'profile', { profile: profile })
)

//POST
routes.post('/job', (req, res) => {
  //Criando ID para os jobs
  const lastId = jobs[jobs.length - 1]?.id || 1 //.length - traz o total de arrays -1 pq o array  começça pelo numero 0 // ? se existir, senao esquece

  //push - para add aos jobs autom.
  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours'],
    created_at: Date.now() //atribuindo uma data de agora
  })

  return res.redirect('/') //depois redireciona para o /
})

module.exports = routes
//manda para fora
// 1 - Chamo novamente o express
// 2 - crio uma router numa const chamando o express.Router
// 2 - Crio uma rota com o router.het
//vou pegar esse router no serve.js com "const routes = require('./routes')"
