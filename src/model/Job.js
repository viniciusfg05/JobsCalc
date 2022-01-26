let data = [
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
]

module.exports = {
  GetJobData() {
    return data
  },
  uptadedjobs(newJob) {
    data = newJob
  },
  delete(id) {
    //filter() - se encontrar ele vai tirar da função
    //como o filter ele retira se for verdadeiro entao temos que ver se o job.id é diferente de jobId
    data = data.filter(job => Number(job.id) !== Number(id))
  },
  create(newJob) {
    data.push(newJob)
  }
}
