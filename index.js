const express = require('express')
const session = require('express-session')
require('./utils/db.config')
const MongoStore = require('connect-mongo')(session)
const mongooseConnection = require('./utils/db.config')
const passport = require('passport')
require('./utils/authStrategies/localStrategy')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')

const authMiddleware = require('./middlewares/authMiddleware')
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '07d3ede92e992686a361b81f7ac47eee86b7c77c',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongooseConnection })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRoutes)

app.get('/', authMiddleware, (req, res) => {
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
