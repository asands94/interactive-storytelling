const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    if (!req.user.username) {
      res.redirect(`${process.env.NEW_USER_REDIRECT}/${req.user._id}/edit`)
    } else {
      res.redirect(`${process.env.USER_REDIRECT}`)
    }
  }
)

router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect(process.env.LOGOUT_REDIRECT)
  })
})

module.exports = router
