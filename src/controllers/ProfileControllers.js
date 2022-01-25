const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    return res.render('profile', { profile: Profile.getData() }) //Profile.get() -
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

    Profile.update({
      //pega os dados de profile.js
      ...Profile.getData(),
      ...req.body,
      'value-hours': valueHour,
      avatar:
        'https://avatars.githubusercontent.com/u/68232658?s=400&u=003f61fe1fe4474daf9c3f5226d596c5f99dd759&v=4'
    })
    //
    return res.redirect('/profile')
  }
}
