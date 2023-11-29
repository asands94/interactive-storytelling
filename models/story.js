const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    // rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

const storyWarnings = Object.freeze({
  VIOLENCE: 'Violence',
  TRAUMA: 'Trauma',
  DRUG_USE: 'Drug Use'
})

const storySchema = new Schema(
  {
    thumbnail: {type: String},
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' },
    tags: { type: String, enum: ['none'] },
    warning: {
      type: [String],
      enum: Object.values(storyWarnings),
    },
    rating: { type: String, enum: ['General', 'Teen', 'Mature', 'Explicit'], default: 'Explicit' },
    summary: { type: String },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Story', storySchema)
