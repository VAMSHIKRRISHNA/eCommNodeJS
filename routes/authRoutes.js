const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/registerValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const guestMiddleware = require('../middlewares/guestMiddleware')
const passport = require('passport')
/**
 * Shows user registration view
 */
router.get('/register', guestMiddleware, (req, res) => {
  try {
    return res.render('register', { message: {}, error: {}, formData: {} })
  } catch (error) {
    console.error(error);
    return res.status(400).render('register', { message: { type: 'error', body: 'Something went wrong' }, error: {}, formData: {} })
  }
})

/**
 * Creates user registration
 */
router.post('/register', guestMiddleware, async (req, res) => {
  try {
    const validationResponse = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResponse.error) {
      return res.status(400).render('register', {
        message: {
          type: 'error',
          body: 'Validation error'
        },
        error: joiErrorFormatter(validationResponse.error),
        formData: req.body
      })
    }
    await addUser(req.body)
    return res.status(200).render('register', {
      message: {
        type: 'success',
        body: 'User Registration is Successfull'
      },
      error: {},
      formData: {}
    })
  } catch (error) {
    console.error(error);
    return res.status(400).render('register', {
      message: {
        type: 'error',
        body: 'Validation error'
      },
      error: mongooseErrorFormatter(error),
      formData: req.body
    })
  }
})

/**
 * Shows user login view
 */
router.get('/login', guestMiddleware, (req, res) => {
  try {
    return res.render('login', { message: {}, error: {}, formData: {} })
  } catch (error) {
    console.error(error);
    return res.status(400).render('login', { message: { type: 'error', body: 'Something went wrong' }, error: {}, formData: {} })
  }
})

/**
 * Shows user login view
 */
router.post('/login', guestMiddleware, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), (req, res) => {
  try {
    return res.render('login', {
      message: {
        type: 'success',
        body: 'Login successful'
      }, error: {}, formData: {}
    })
  } catch (error) {
    console.error(error);
    return res.status(400).render('login', { message: { type: 'error', body: 'Something went wrong' }, error: {}, formData: {} })
  }
})

module.exports = router
