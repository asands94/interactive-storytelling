const Chapter = require('../models/chapter')
const Story = require('../models/story')

const newChapter = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
    res.render('chapter/new', {story, apiKey: process.env.TINY_API})
  } catch (e) {
    
  }
  
}

const create = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)

    const chapter = await Chapter.create(req.body)

    story.chapters.push(chapter)

    story.save()
    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  newChapter,
  create
}