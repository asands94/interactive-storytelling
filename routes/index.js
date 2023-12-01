const express = require('express')
const router = express.Router()

const passport = require('passport')
const Story = require('../models/story')

router.get('/', async (req, res, next) => {
  try {
    const stories = await Story.find({})

    const limitedStories = stories.reverse().slice(0,3)

    res.render('index', {limitedStories, apiKey: process.env.TINY_API})
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})

router.get(
  '/auth/google',
  passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      // Requesting the user's profile and email
      scope: ['profile', 'email'],
      // Optionally force user to pick account every time
      prompt: "select_account"
    }
  )
)

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }), (req, res) => {
    if (!req.user.username) {
      // Redirect to edit profile page for new users
      return res.redirect(`/profile/${req.user._id}`);
    } else {
      // Redirect to main page for existing user
      return res.redirect('/');
    }
  }
)

router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/')
  })
})

module.exports = router
