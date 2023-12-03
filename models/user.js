const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: String,
    googleId: String,
    email: String,
    username: String,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
