const Profile = require('../models/profile')
const User = require('../models/user')

const update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    const profile = await Profile.findOne({ user: req.params.id })
    profile.username = req.body.username
    await profile.save()

    res.redirect(`/profile/${user._id}`)
  } catch (e) {
    console.log({error: e.message})
  }
  
}

module.exports = {
  update
}