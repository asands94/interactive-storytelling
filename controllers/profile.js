const User = require('../models/user')
const Story = require('../models/story')

const index = async (req, res) => {
  try {
    const stories = await Story.find({ author: req.params.id }).populate('author')
    res.render('profile/index', {stories, apiKey: process.env.TINY_API})
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