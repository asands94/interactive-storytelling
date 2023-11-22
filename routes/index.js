const express = require('express')
const router = express.Router()

const passport = require('passport')
const profileCtrl = require('../controllers/profile')

router.get('/', (req, res, next) => {
  res.render('index', {apiKey: process.env.TINY_API})
})

router.get('/profile/:id', (req, res, next) => {
  res.render('profile', {apiKey: process.env.TINY_API})
})

router.put('/profile/:id', profileCtrl.update)

router.get(
  '/auth/google',
  passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      // Requesting the user's profile and email
      scope: ['profile', 'email'],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  )
)

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
  })
)

router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/')
  })
})

module.exports = router
