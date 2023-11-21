const Story = require('../models/story')

const index = async (req, res) => {
  try {
    const story = await Story.find({})

    res.json(story)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

const create = async (req, res) => {
  try {
    const story = await Story.create(req.body)

    res.status(201).json(story)
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
  create,
  update,
  delete: deleteStory,
}
