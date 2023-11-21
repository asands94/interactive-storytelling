const express = require('express')
const router = express.Router()

const exampleCtrl = require('../controllers/example')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', exampleCtrl.index)

router.post('/', ensureLoggedIn, exampleCtrl.create)

router.put('/:id', ensureLoggedIn, exampleCtrl.update)

router.delete('/:id', ensureLoggedIn, exampleCtrl.delete)

module.exports = router
