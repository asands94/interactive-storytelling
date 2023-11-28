const Profile = require('../models/profile')
const User = require('../models/user')

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
  update
}