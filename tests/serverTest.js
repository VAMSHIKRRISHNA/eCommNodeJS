const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// config chai
chai.use(chaiHttp)
chai.should()

describe('Test server connectivity', () => {
  it('Should return 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
})

describe('Make sure /register fails on insufficient data', () => {
  it('Should return 400', (done) => {
    chai.request(app)
      .post('/register')
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })
})
