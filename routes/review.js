const express = require('express')
const router = express.Router()

const reviewCtrl = require('../controllers/review')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.post('/stories/:id/review', ensureLoggedIn, reviewCtrl.create)
router.delete('/review/:id', ensureLoggedIn, reviewCtrl.delete)

module.exports = router