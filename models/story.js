const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    content: { type: String },
  },
  {
    timestamps: true,
  }
)

const storySchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    author: { type: Schema.Types.ObjectId, ref: 'Profile' },
    tags: { type: String, enum: ['none'] },
    warning: {
      type: String,
      enum: ['Violence', 'Trauma'],
    },
    rating: { type: String, enum: ['General', 'Teen', 'Mature', 'Explicit'] },
    summary: { type: String },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Story', storySchema)
