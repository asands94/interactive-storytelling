const Story = require('../models/story')

const index = async (req, res) => {
  try {
    const stories = await Story.find({})

    res.render('stories/index', { stories })
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

const newStory = async (req, res) => {
  res.render('stories/new', { apiKey: process.env.TINY_API })
}

const show = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)

    res.render('stories/show', { story })
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

const create = async (req, res) => {
  try {
    req.body.author = req.user
    const story = await Story.create(req.body)

    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id

    const story = await Story.findByIdAndUpdate(id, req.body, { new: true })

    res.send(story)
  } catch (e) {
    res.status(424).json({ error: e.message })
  }
}

const deleteStory = async (req, res) => {
  try {
    const id = req.params.id

    const story = await Story.findByIdAndDelete(id)

    res.send(story)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

module.exports = {
  index,
  newStory,
  show,
  create,
  update,
  delete: deleteStory,
}
