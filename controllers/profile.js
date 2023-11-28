const Profile = require('../models/profile')

const index = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id })
    res.render('profile/index', {profile, apiKey: process.env.TINY_API})
  } catch (e) {
    console.log({error: e.message})
  }
}

const update = async (req, res) => {
  try {
    const userId = req.params.id

    const profile = await Profile.findOne({ user: userId})

    profile.username = req.body.username

    await profile.save()

    res.redirect(`/profile/${userId}`)
  } catch (e) {
    console.log({error: e.message})
  }
  
}

module.exports = {
  index,
  update
}