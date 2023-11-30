const Story = require('../models/story')

const edit = async(req, res) => {
  try {
    const story = await Story.findOne({ "comments._id": req.params.id })

    const comment = story.comments.id(req.params.id)


    res.render('comments/edit', {story, comment, apiKey: process.env.TINY_API })
  } catch(e) {
    res.status(404).json({ error: e.message })
  }
}

const create = async (req, res) => {
  try {

    const story = await Story.findById(req.params.id)

    req.body.user = req.user

    story.comments.push(req.body)

    await story.save()
  
    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const update = async (req, res) => {
  try {

    const story = await Story.findOne({ "comments._id": req.params.id })

    story.comments.id(req.params.id).content = req.body.content
    story.markModified('comments')
    await story.save()

    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const deleteComment = async (req, res) => {
  try {

    const story = await Story.findOne({ "comments._id": req.params.id })
    
    story.comments.remove(req.params.id)

    story.save()

    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}


module.exports = {
  edit,
  create,
  update,
  delete: deleteComment,
}
