const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async save(req, res) {
    const jobs = await Job.GetJobData()
    //Criando ID para os jobs
    const lastId = jobs[jobs.length - 1]?.id || 0 //.length - traz o total de arrays -1 pq o array  começça pelo numero 0 // ? se existir, senao esquece

    //push - para add aos jobs autom.

    Job.create({
      // O model é o unico que deve fazer as alteraçãoe dos dados. Entao criamo no Job.js uma função "create(newJob)" que atualiza os os dados do Jobs diretamente pelo model, aq fazemos apenas a requisição
      id: lastId + 1,
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now() //atribuindo uma data de agora
    })

    jobs.push()

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

    const newJobs = jobs.map(job => {
      //
      if (Number(job.id) === Number(jobId)) {
        job = updateJob
      }
      //
      return job
    })

    Job.uptadedjobs(newJobs)

    res.redirect('/job/' + jobId)
  },
  delete(req, res) {
    const jobId = req.params.id //esse id é o msm da rota

    Job.delete(jobId)

    return res.redirect('/')
  }
}
