const express = require('express')
const router = express.Router()

const passport = require('passport')
const profileCtrl = require('../controllers/profile')
const Profile = require('../models/profile')
const Story = require('../models/story')

router.get('/', async (req, res, next) => {
  try {
    const stories = await Story.find({})

    res.render('simple-index', {stories, apiKey: process.env.TINY_API})
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})

router.get('/profile/:id', async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.id })
  console.log(profile)
  res.render('profile', {profile, apiKey: process.env.TINY_API})
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
