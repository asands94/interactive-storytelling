const Profile = require('../models/profile')
const User = require('../models/user')

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

    const user = await User.findById(userId)
    
    console.log(user)

    user.name = req.body.name

    await user.save()



    res.redirect(`/profile/${userId}`)
  } catch (e) {
    console.log({error: e.message})
  }
  
}

module.exports = {
  index,
  update
}