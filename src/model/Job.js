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
  }
}
