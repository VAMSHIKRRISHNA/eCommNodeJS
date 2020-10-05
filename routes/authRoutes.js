const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/registerValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
/**
 * Shows user registration view
 */
router.get('/', (req, res) => {
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
router.post('/', async (req, res) => {
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

module.exports = router
