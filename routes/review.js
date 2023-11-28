const express = require('express')
const router = express.Router()

const reviewCtrl = require('../controllers/review')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/review/:id', ensureLoggedIn, reviewCtrl.edit)
router.post('/stories/:id/review', ensureLoggedIn, reviewCtrl.create)
router.put('/review/:id', ensureLoggedIn, reviewCtrl.update)
router.delete('/review/:id', ensureLoggedIn, reviewCtrl.delete)

module.exports = router