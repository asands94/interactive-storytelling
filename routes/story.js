const express = require('express')
const multer = require("multer");
const upload = multer();
const router = express.Router()

const storyCtrl = require('../controllers/story')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', storyCtrl.index)

router.get('/new', ensureLoggedIn, storyCtrl.newStory)

router.get('/:id', storyCtrl.show)

router.post('/', ensureLoggedIn, upload.single("imageUpload"), storyCtrl.create)

router.get('/edit/:id', ensureLoggedIn, storyCtrl.editStory)

router.put('/:id', ensureLoggedIn, upload.single("imageUpload"), storyCtrl.update)

router.delete('/:id', ensureLoggedIn, storyCtrl.delete)


module.exports = router
