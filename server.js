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
const storyRouter = require('./routes/story')
const chapterRouter = require('./routes/chapter')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

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

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.use(indexRouter)
app.use('/stories', storyRouter)
app.use('/', chapterRouter)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
