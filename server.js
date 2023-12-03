const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

require('dotenv').config()
require('./config/database')
require('./config/passport')

const PORT = process.env.PORT

const indexRouter = require('./routes/index')
const profileRouter = require('./routes/profile')
const storyRouter = require('./routes/story')
const commentRouter = require('./routes/comment')
const pollRouter = require('./routes/poll')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use(indexRouter)
app.use(profileRouter)
app.use('/stories', storyRouter)
app.use(commentRouter)
app.use(pollRouter)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error', { apiKey: process.env.TINY_API })
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
