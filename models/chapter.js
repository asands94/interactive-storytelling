const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chapterSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Chapter', chapterSchema)
