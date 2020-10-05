const express = require('express')
require('./utils/db.config')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use('/register', authRoutes)

app.get('/', (req, res) => {
  try {
    return res.render('index')
  } catch (error) {
    return res.status(500).send(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running on port : 3000')
})

module.exports = app
