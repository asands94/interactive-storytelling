const User = require('../models/user')

const index = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id)
    res.render('profile/index', {profile, apiKey: process.env.TINY_API})
  } catch (e) {
    console.log({error: e.message})
  }
}

const update = async (req, res) => {
  try {
    const userId = req.params.id

    await User.findByIdAndUpdate(userId, req.body, {new: true})
    
    res.redirect(`/profile/${userId}`)
  } catch (e) {
    console.log({error: e.message})
  }
  
}

module.exports = {
  index,
  update
}