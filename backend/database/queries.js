const Pool = require('pg').Pool
require('dotenv').config()
const connString = process.env.DATABASE_URL
const pool = new Pool({
  connString
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