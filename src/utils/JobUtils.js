module.exports = {
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
