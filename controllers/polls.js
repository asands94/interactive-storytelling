const Story = require('../models/story')

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

module.exports = {
  create
}