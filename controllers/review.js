const Story = require('../models/story')

const edit = async(req, res) => {
  try {
    const story = await Story.findOne({ "reviews._id": req.params.id })

    const review = story.reviews.id(req.params.id)

    const currentRating = review.rating

    res.render('reviews/edit', {story, review, currentRating, apiKey: process.env.TINY_API })
  } catch(e) {
    res.status(404).json({ error: e.message })
  }
}

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

const update = async (req, res) => {
  try {

    const story = await Story.findOne({ "reviews._id": req.params.id })

    story.reviews.id(req.params.id).rating = req.body.rating
    story.reviews.id(req.params.id).content = req.body.content
    story.markModified('reviews')
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
  edit,
  create,
  update,
  delete: deleteReview,
}
