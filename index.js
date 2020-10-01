const express = require('express')
const app = express()

app.get('/', (req, res) => {
    try {
        return res.send('Hello World')
    } catch (error) {
        return res.status(500).send('Hello World')
    }
})

app.listen(3000, () => {
  console.log('Server is running on port : 3000')
})

module.exports = app
