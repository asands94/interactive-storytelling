const Story = require('../models/story')

const create = async (req, res) => {
  try {

    const story = await Story.findById(req.params.id)

    story.reviews.push(req.body)

    await story.save()
  
    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const deleteReview = async (req, res) => {
  try {

    const story = await Story.findOne({ "reviews._id": req.params.id })
    
    story.reviews.remove(req.params.id)

    story.save()

    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}


module.exports = {
  create,
  delete: deleteReview
}
