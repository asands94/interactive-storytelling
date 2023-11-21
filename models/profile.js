const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema(
  {
    username: { type: String },
    stories: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Profile', profileSchema)
