const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pollSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [String],
    votes: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        selectedOption: { type: String }
      }
    ]
    
  },
  {
    timestamps: true,
  }
)

const commentSchema = new Schema(
  {
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

const thumbnailSchema = new Schema(
  {
    url: { type: String},
    description: { type: String },
    alt: {type: String, default: "story cover"}
  }, 
  {
    timestamps: true
  }
)

const storyWarnings = Object.freeze({
  VIOLENCE: 'Violence',
  TRAUMA: 'Trauma',
  DRUG_USE: 'Drug Use'
})

const storySchema = new Schema(
  {
    thumbnail: thumbnailSchema,
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: String, enum: ['none'] },
    warning: {
      type: [String],
      enum: Object.values(storyWarnings),
    },
    rating: { type: String, enum: ['General', 'Teen', 'Mature', 'Explicit'], default: 'Explicit' },
    summary: { type: String, required: true },
    comments: [commentSchema],
    polls: [pollSchema]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Story', storySchema)
