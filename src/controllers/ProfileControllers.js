const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    return res.render('profile', { profile: await Profile.getData() }) //Profile.get() -
  },
  async update(req, res) {
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

    const profile = await Profile.getData()

    await Profile.update({
      //pega os dados de profile.js
      ...profile,
      ...req.body,
      'value-hours': valueHour
    })
    //
    return res.redirect('/profile')
  }
}
