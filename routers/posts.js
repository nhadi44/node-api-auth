const router = require('express').Router()
const post = require('../controllers/post.controller')
const verify = require('../middleware/verifyToken')

router.get('/', verify, post.post)

module.exports = router