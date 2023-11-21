const express = require('express')
const router = express.Router()

const storyCtrl = require('../controllers/story')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', storyCtrl.index)

router.get('/new', storyCtrl.newStory)

router.get('/:id', storyCtrl.show)

router.post('/', ensureLoggedIn, storyCtrl.create)

router.put('/:id', ensureLoggedIn, storyCtrl.update)

router.delete('/:id', ensureLoggedIn, storyCtrl.delete)

module.exports = router