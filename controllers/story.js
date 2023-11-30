const Story = require('../models/story')
const User = require('../models/user')

const cloudinary = require('cloudinary').v2
const streamifier = require("streamifier");
const { clConfig } = require("../config/cloudinary.js");

cloudinary.config(clConfig);

const index = async (req, res) => {
  try {
    const stories = await Story.find({})

    res.render('stories/index', { stories, apiKey: process.env.TINY_API })
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

const newStory = (req, res) => {
  try {
    const warningOptions = Object.values(
      Story.schema.path('warning').caster.enumValues
    )

    res.render('stories/new', { warningOptions, apiKey: process.env.TINY_API })
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

const show = async (req, res) => {
  try {

    const story = await Story.findById(req.params.id).populate('comments.user')

    res.render('stories/show', { story, apiKey: process.env.TINY_API })
  } catch (e) {
    res.redirect('/stories')
  }
}

const create = async (req, res) => {
  try {
    req.body.author = req.user
    const story = await Story.create(req.body)

    
    // photo upload
    let result = await streamUpload(req);
    console.log(req.body);

    const newImage = { url: result.url, description: req.body.description, alt: req.body.alt }
    story.thumbnail = newImage

    await story.save()

    const user = await User.findById(req.user._id)

    user.stories.push(story)

    await user.save()
    
    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const editStory = async (req, res) => {
  try {
    const warningOptions = Object.values(
      Story.schema.path('warning').caster.enumValues
    )
    const story = await Story.findById(req.params.id)

    const currentRating = story.rating

    const selectedWarnings = story.warning
   
    res.render('stories/edit', {
      story,
      currentRating,
      warningOptions,
      selectedWarnings,
      apiKey: process.env.TINY_API,
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id

    const story = await Story.findByIdAndUpdate(id, req.body, { new: true })

    res.redirect(`/stories/${story._id}`)
  } catch (e) {
    res.status(424).json({ error: e.message })
  }
}

const deleteStory = async (req, res) => {
  try {
    const id = req.params.id

    await Story.findByIdAndDelete(id)

    res.redirect(`/stories`)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

function streamUpload (req) {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        console.log(result);
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

module.exports = {
  index,
  newStory,
  show,
  create,
  editStory,
  update,
  delete: deleteStory,
}
