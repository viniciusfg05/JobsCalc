const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    const jobs = Job.GetJobData() // retorna data job
    const profile = Profile.getData() // retorna data de profile
    //
    const updatedJobs = jobs.map(job => {
      //
      const remaining = JobUtils.remainingDays(job) //usando a função que conta os dias restantes
      const status = remaining <= 0 ? 'done' : 'progress'

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calcutateBudget(job, profile['value-hours'])
      }
    })

    return res.render('index', { jobs: updatedJobs }) //agora o valor de jobs é uptadedjobs
  },
  //
  save(req, res) {
    const jobs = Job.GetJobData()
    //Criando ID para os jobs
    const lastId = jobs[jobs.length - 1]?.id || 0 //.length - traz o total de arrays -1 pq o array  começça pelo numero 0 // ? se existir, senao esquece

    //push - para add aos jobs autom.
    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now() //atribuindo uma data de agora
    })

    return res.redirect('/') //depois redireciona para o /
  },
  create(req, res) {
    return res.render('job')
  },
  show(req, res) {
    const jobs = Job.GetJobData()
    const profile = Profile.getData()

    //
    const jobId = req.params.id //esse id é o msm da rota

    //find(): encontrar //vari ferificar se o Id na rota é igual ao Id no sistema // se encontro resturn para o job
    const job = jobs.find(job => Number(job.id) === Number(jobId))
    //"job.id === jobId" : o dado jobId pode parecer um numero mas pode ser um string, temos que garantir que ambom são number

    // "!" se nao tiver job
    if (!job) {
      return res.send('Job not found')
    }

    job.budget = JobUtils.calcutateBudget(job, profile['value-hours'])

    return res.render('job-edit', { job })
  },
  update(req, res) {
    const jobs = Job.GetJobData()

    //
    const jobId = req.params.id //esse id é o msm da rota

    //find(): encontrar //vari ferificar se o Id na rota é igual ao Id no sistema // se encontro resturn para o job
    const job = jobs.find(job => Number(job.id) === Number(jobId))
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
      'daily-hours': req.body['daily-hours'] //dados enviando pelo formulario
    }

    Job.data = Job.data.map(job => {
      if (Number(job.id) === Number(jobId)) {
        job = updateJob
      }
      //
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
}
