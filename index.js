const express = require('express')
require('./utils/db.config')
const bodyParser = require('body-parser')
const app = express()

const User = require('./models/User')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    try {
        return res.render('index')
    } catch (error) {
        return res.status(500).send(error)
    }
})

app.get('/register', (req, res) => {
    try {
        return res.render('register')
    } catch (error) {
        return res.status(500).send(error)
    }
})

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        return res.render('register', { message: 'User Registration is Successfull'})
    } catch (error) {
        return res.status(500).send(error)
    }
})

app.listen(3000, () => {
  console.log('Server is running on port : 3000')
})

module.exports = app
