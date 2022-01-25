const express = require('express')
const routes = express.Router()
const views = __dirname + '/views/'

const Profile = {
  data: {
    name: 'Vinicius',
    avatar:
      'https://avatars.githubusercontent.com/u/68232658?s=400&u=003f61fe1fe4474daf9c3f5226d596c5f99dd759&v=4',
    'monthly-budget': 6000,
    'days-per-week': 6,
    'hours-per-day': 6,
    'vacation-per-year': 5,
    'value-hours': 0
  },

  controllers: {
    index(req, res) {
      return res.render(views + 'profile', { profile: Profile.data })
    },
    update(req, res) {
      // req.body para pegar os dadosnom
      const data = req.body

      // definir quantas semans tem num ano
      const weeksPerYear = 52

      // remover as semans de férias do ano
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

      // quantas horas por semans estou trabalhando
      const weekTotalHours = data['hours-per-day'] * data['days-per-week']

      //total de horas trabalhadas no mes
      const monthlyTotalHours = weeksPerMonth * weekTotalHours

      //Valor da minha hora
      const valueHour = data['monthly-budget'] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        'value-hours': valueHour,
        avatar:
          'https://avatars.githubusercontent.com/u/68232658?s=400&u=003f61fe1fe4474daf9c3f5226d596c5f99dd759&v=4'
      }

      return res.redirect('/profile')
    }
  }
}

//Criei um controle para ficar algumas funçoes
const Job = {
  data: [
    //Estrutura de dados jobs
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 5,
      'total-hours': 60,
      created_at: Date.now()
    },
    {
      id: 2,
      name: 'OneTwo Project',
      'daily-hours': 4,
      'total-hours': 65,
      created_at: Date.now()
    }
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        //
        const remaining = Job.services.remainingDays(job) //usando a função que conta os dias restantes
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calcutateBudget(job, Profile.data['value-hours'])
        }
      })

      return res.render(views + 'index', { jobs: updatedJobs }) //agora o valor de jobs é uptadedjobs
    },
    //
    save(req, res) {
      //Criando ID para os jobs
      const lastId = Job.data[Job.data.length - 1]?.id || 0 //.length - traz o total de arrays -1 pq o array  começça pelo numero 0 // ? se existir, senao esquece

      //push - para add aos jobs autom.
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now() //atribuindo uma data de agora
      })

      return res.redirect('/') //depois redireciona para o /
    },
    create(req, res) {
      return res.render(views + 'job')
    },
    edit(req, res) {
      return res.render(views + 'job-edit')
    },
    show(req, res) {
      const jobId = req.params.id //esse id é o msm da rota

      //find(): encontrar //vari ferificar se o Id na rota é igual ao Id no sistema // se encontro resturn para o job
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      //"job.id === jobId" : o dado jobId pode parecer um numero mas pode ser um string, temos que garantir que ambom são number

      // "!" se nao tiver job
      if (!job) {
        return res.send('Job not found')
      }

      job.budget = Job.services.calcutateBudget(
        job,
        Profile.data['value-hours']
      )

      return res.render(views + 'job-edit', { job })
    },
    update(req, res) {
      const jobId = req.params.id //esse id é o msm da rota

      //find(): encontrar //vari ferificar se o Id na rota é igual ao Id no sistema // se encontro resturn para o job
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      //"job.id === jobId" : o dado jobId pode parecer um numero mas pode ser um string, temos que garantir que ambom são number

      // "!" se nao tiver job
      if (!job) {
        return res.send('Job not found')
      }

      //
      const updateJob = {
        ...job,
        name: req.body.name, //sobrescrevendo com req.body
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours']
      }

      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updateJob
        }
        return job
      })

      res.redirect('/job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id //esse id é o msm da rota
      //filter() - se encontrar ele vai tirar da função
      //como o filter ele retira se for verdadeiro entao temos que ver se o job.id é diferente de jobId
      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
  },
  services: {
    remainingDays(job) {
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed() //toFixed() - para arredondar o numero

      const createdDate = new Date(job.created_at) //data de criação do projeto
      const dueDay = createdDate.getDate() + Number(remainingDays) //soma a data da criação com os dias restantes
      const dueDateInMs = createdDate.setDate(dueDay) //data do futuro data de vencimento

      const timeDiffInMs = dueDateInMs - Date.now() //dia restante ou vencimento - a data de agora
      const dayInMs = 1000 * 60 * 60 * 24 //transformando milli em dias
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs) //Math.floor - apara arredondar para baixo //

      return dayDiff
    },
    calcutateBudget: (job, valueHour) => valueHour * job['total-hours'] //valor da minha hora
  }
}

//função que conta os dias restantes

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes
//manda para fora
// 1 - Chamo novamente o express
// 2 - crio uma router numa const chamando o express.Router
// 2 - Crio uma rota com o router.het
//vou pegar esse router no serve.js com "const routes = require('./routes')"
