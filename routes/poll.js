const express = require('express')
const router = express.Router()

const pollsCtrl = require('../controllers/polls')
const ensureLoggedIn = require('../config/ensureLoggedIn')


router.get('/:id/poll', ensureLoggedIn, pollsCtrl.new)
router.post('/stories/:id/polls', ensureLoggedIn, pollsCtrl.create)

module.exports = router