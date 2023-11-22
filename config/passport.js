const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user')
const Profile = require('../models/profile')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },

    async (accessToken, refreshToken, profile, cb) => {
      try {
        // A user has logged in with OAuth...
        let user = await User.findOne({ googleId: profile.id })
        // Existing user found, so provide it to passport
        if (user) return cb(null, user)
        // We have a new user via OAuth!
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        })

        const userProfile = await Profile.create({
          user: user._id
        })

        user.profile = userProfile._id
        await user.save()
        
        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser(async (userId, cb) => {
  // It's nice to be able to use await in-line!
  cb(null, await User.findById(userId).populate('profile'))
})
