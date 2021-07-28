const router = require('express').Router()
// const User = require('../models/User')
const user = require('../controllers/user.controller')

router.get('/register', user.findAll)
router.post('/register', user.create)
router.post('/login', user.login)
router.get('/register/:id', user.findOne)

// Post

module.exports = router;