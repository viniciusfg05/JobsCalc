//Ele vai ser responsavel por criar nosso banco dados  e chamar o banco
const Database = require('./config') // Temos que importar a Config pq é nela que ta nossa funação open

//Devemos criar um função parecida com o "open" de config
//init é como se fosse o meu get (para pegar) //e a estrutura do init deve ser async (async - fala pro JS que vai ter await)
//todo o comando de criação e insert serve está dentro de init()
// chamei o database ja iniciamos a conexção com o banco - (abre a conexão)
//Toda vez que formo ultilizar o await ele precisa está dentro de uma estrutura de função "async"
//await = faz com que o o Ja espere o Database terminar
//Como temos que esperar a finalização do Data base, vamos crair um const db
//E vamos trocar DAtabase por db  Antente = "Database.exec()" depois "db.exec()"
//somente o Databse está numa const pq preciso da finalização do Databse os outros nao preciso

const initDb = {
  async init() {
    const db = await Database()

    await db.exec(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hours INT
      )
    `) //Executar o sql no banco de dados// podemos usar em qualquer banco de dados

    await db.exec(`CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT, 
      created_at DATETIME
      )`)

    //Profile
    await db.run(
      `INSERT INTO profile ( name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hours
      ) VALUES ( "Vinicius", "https://avatars.githubusercontent.com/u/68232658?s=400&u=003f61fe1fe4474daf9c3f5226d596c5f99dd759&v=4", 3000, 5, 5, 4, 75 );`
    )

    //jobs
    await db.run(
      `INSERT INTO jobs (name, daily_hours, total_hours, created_at) 
    VALUES ( "Discovery LTDA", 2, 1, 1617514376018);`
    )

    await db.run(
      `INSERT INTO jobs (name, daily_hours, total_hours, created_at)
      VALUES ( "OneTwo Project", 5, 40, 1617514376018);`
    )

    await db.close() // Para fechar a conexão com o banco de dados (quase como uma porta que abre e fecha para pegar ou retirar dados )
  }
}

initDb.init() //Aq eu to mandando executar o init()
