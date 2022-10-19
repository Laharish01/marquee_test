const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: 5432,
  
})



pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

const getCompanies = (req, res) => {
  pool.query('SELECT * FROM companies', (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows)
  })
}

const createCompany = (req, res) => {
  const { cin, name } = req.body

  pool.query('INSERT INTO companies VALUES ($1, $2) RETURNING *', [cin, name], (error, results) => {
    if (error) {
      res.status(401).send(error.detail)
      return
    }
    res.status(201).send(`Company added with ID: ${results.rows[0].cin}`)
  })
}

const deleteCompany = (req, res) => {
  pool.query('DELETE FROM companies WHERE cin = $1', [req.body.cin], (err, results) => {
    if (err) throw err
    res.status(201).send(`Deleted successfully `)
  })
}

module.exports = {
  getCompanies,
  createCompany,
  deleteCompany
}