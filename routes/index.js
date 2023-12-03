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
      res.redirect(process.env.NEW_USER_REDIRECT)
    } else {
      // Redirect to main page for existing user
      res.redirect(process.env.LOGOUT_EXISTING_USER_REDIRECT)
    }
  }
)

router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect(process.env.LOGOUT_EXISTING_USER_REDIRECT)
  })
})

module.exports = router
