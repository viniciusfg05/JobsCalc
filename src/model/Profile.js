let data = {
  name: 'Vinicius',
  avatar:
    'https://avatars.githubusercontent.com/u/68232658?s=400&u=003f61fe1fe4474daf9c3f5226d596c5f99dd759&v=4',
  'monthly-budget': 6000,
  'days-per-week': 6,
  'hours-per-day': 6,
  'vacation-per-year': 5,
  'value-hours': 0
}

module.exports = {
  //retorna a data para pegar no //Profile.get() no ProfileControllers.js
  getData() {
    return data
  },
  update(newData) {
    //Para atualizar o dados
    data = newData
  }
}
