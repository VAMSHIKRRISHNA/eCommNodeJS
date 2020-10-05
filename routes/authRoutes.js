const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')

/**
 * Shows user registration view
 */
router.get('/', (req, res) => {
    try {
        return res.render('register', { message: null})
    } catch (error) {
        console.error(error);
        return res.status(400).render('register', { message: 'Something went wrong'})
    }
})

/**
 * Creates user registration 
 */
router.post('/', async (req, res) => {
    try {
        await addUser(req.body)
        return res.render('register', { message: 'User Registration is Successfull'})
    } catch (error) {
        console.error(error);
        return res.status(400).render('register', { message: 'Something went wrong'})
    }
})

module.exports = router
