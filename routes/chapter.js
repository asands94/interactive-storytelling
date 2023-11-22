const express = require('express')
const router = express.Router()

const chapterCtrl = require('../controllers/chapter')
const ensureLoggedIn = require('../config/ensureLoggedIn')


router.get('/stories/:id/chapter', chapterCtrl.newChapter)
router.post('/stories/:id/chapter', chapterCtrl.create)

module.exports = router