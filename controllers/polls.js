const { render } = require('ejs')
const Story = require('../models/story')

const newPoll = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
    
    res.render('polls/new', {story, apiKey: process.env.TINY_API })
  } catch (e) {
    
  }
}

const create = async (req, res) => {
  try {

    const story = await Story.findById(req.params.id)

    story.polls.push(req.body)

    await story.save()

    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const vote = async (req, res) => {
  try {
    const story = await Story.findById(req.params.storiesId)

    const poll = story.polls.id(req.params.pollsId)

    const vote = {
      user: req.user,
      selectedOption: req.body.selectedOption
    }

    poll.votes.push(vote)

    await story.save()


    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  new: newPoll,
  create,
  vote
}