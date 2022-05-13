const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
const app = require('../app')

chai.use(chaiHttp)

describe('GET product', () => {
  it('get product data', () => {
    chai
      .request(app)
      .get('/products', (err, res) => {
        const result = res.statusCode
        expect(result).to.equal(200)
      })
  })
})

describe('GET Order for one user', () => {
    it('get order data', () => {
      chai
        .request(app)
        .post('/getOrder',{user_id: "6265ed80f8ac2c75d7d1a447"}, (err, res) => {
          const result = res.statusCode
          expect(result).to.equal(200)
        })
    })
  })

  describe('GET User Data', () => {
    it('get user data', () => {
      chai
        .request(app)
        .post('/getUserData',{user_id: "6265ed80f8ac2c75d7d1a447"}, (err, res) => {
          const result = res.statusCode
          expect(result).to.equal(200)
        })
    })
  })

  describe('register', () => {
    it('register User', () => {
      chai
        .request(app)
        .post('/getUserData',{
            "username": "Rushabh",
            "email": "rushabh4@gmail.com",
            "password": "rushabh4"
        }, (err, res) => {
          const result = res.statusCode
          expect(result).to.equal(200)
        })
    })
  })

  describe('login user', () => {
    it('login User', () => {
      chai
        .request(app)
        .post('/login',{
            "username": "Rushabh",
            "password": "rushabh4"
        }, (err, res) => {
          const result = res.statusCode
          expect(result).to.equal(200)
        })
    })
  })