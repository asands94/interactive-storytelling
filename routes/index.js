const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get(
  '/auth/google',
  passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      // Requesting the user's profile and email
      scope: ['profile', 'email'],
      // Optionally force user to pick account every time
      prompt: 'select_account',
    }
  )
)

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    if (!req.user.username) {
      // Redirect to edit profile page for new users
      res.redirect('http://localhost:5173/stories/new')
    } else {
      // Redirect to main page for existing user
      res.redirect('http://localhost:5173/stories')
    }
  }
)

router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('http://localhost:5173/stories')
  })
})

module.exports = router
