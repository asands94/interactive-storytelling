const express = require('express')
const router = express.Router()

const commentCtrl = require('../controllers/comment')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/comment/:id', ensureLoggedIn, commentCtrl.edit)
router.post('/stories/:id/comment', ensureLoggedIn, commentCtrl.create)
router.put('/comment/:id', ensureLoggedIn, commentCtrl.update)
router.delete('/comment/:id', ensureLoggedIn, commentCtrl.delete)

module.exports = router