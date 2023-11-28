const express = require('express')
const router = express.Router()
const profileCtrl = require('../controllers/profile')


router.get('/profile/:id', profileCtrl.index)

router.put('/profile/:id', profileCtrl.update)


module.exports = router
