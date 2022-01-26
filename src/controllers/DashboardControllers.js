const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  index(req, res) {
    const jobs = Job.GetJobData() // retorna data job
    const profile = Profile.getData() // retorna data de profile
    //

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    //Quantidade de horas/ dia de cada projeto em andamento
    let jobTotalHours = 0

    const updatedJobs = jobs.map(job => {
      // olhando os status dos jo
      //
      const remaining = JobUtils.remainingDays(job) //usando a função que conta os dias restantes
      const status = remaining <= 0 ? 'done' : 'progress'

      //somando a quantidade de status
      statusCount[status] += 1
      //aq vai pegar a variavel statusCount que tem [status] - esse estatus em chouchetes quer dizer: Se os status receber "done" que é igual ao "done" da variavel let statusCount ele vai somar 1 a msm coisa do "progress" se ele receber os status de progress ele vai receber mais 1

      //somar a quantidade de de projeto em andamento somar com quantidade de horas que eu quero trabalhar em cada projeto
      if (status == 'progress') {
        jobTotalHours += Number(job['daily-hours'])
      }

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calcutateBudget(job, profile['value-hours'])
      }
    })

    //quantidade de horas q quero trabalhar - quantidade de trabalhado dedicados por horas
    const freeHours = profile['hours-per-day'] - jobTotalHours

    return res.render('index', {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours
    }) //agora o valor de jobs é uptadedjobs
  }
}
