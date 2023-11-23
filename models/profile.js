const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema(
  {
    username: { type: String, unique: true },
    stories: { type: String },
    user: {type: Schema.Types.ObjectId, ref: 'User', unique: true}
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Profile', profileSchema)
