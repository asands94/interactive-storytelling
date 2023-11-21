const Example = require('../models/story')

const index = async (req, res) => {
  try {
    const example = await Example.find({})

    res.json(example)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

const create = async (req, res) => {
  try {
    const example = await Example.create(req.body)

    res.status(201).json(example)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id

    const example = await Example.findByIdAndUpdate(id, req.body, { new: true })

    res.send(example)
  } catch (e) {
    res.status(424).json({ error: e.message })
  }
}

const deleteExample = async (req, res) => {
  try {
    const id = req.params.id

    const example = await Example.findByIdAndDelete(id)

    res.send(example)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

module.exports = {
  index,
  create,
  update,
  delete: deleteExample,
}
