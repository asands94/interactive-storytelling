const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')

require('dotenv').config()
require('./config/database')
require('./config/passport')

const PORT = process.env.PORT

const indexRouter = require('./routes/index')
const exampleRouter = require('./routes/example')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
app.use('/example', exampleRouter)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
