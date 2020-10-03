const express = require('express')
require('./utils/db.config')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    try {
        return res.render('index')
    } catch (error) {
        return res.status(500).send('Hello World')
    }
})

app.listen(3000, () => {
  console.log('Server is running on port : 3000')
})

module.exports = app
