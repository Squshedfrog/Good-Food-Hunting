const express = require('express')
const app = express()
const port = process.env.PORT || 8080
app.set("view engine", "ejs")
const expressLayouts = require('express-ejs-layouts');
const logger = require('./middlewares/logger')
const methodOverride = require('./middlewares/methodoverride')
const setCurrentUser = require('./middlewares/set_current_user')
const client = require('./db')
const viewHelpers = require('./middlewares/view_helper')
const usersController = require('./controllers/user_controller')



const bcrypt = require('bcrypt');
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

// passing the request body ---- 
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(expressLayouts);
//methodOverride only works needs to pass the body first
app.use(methodOverride)
app.use(logger);

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  secret: 'keyboard cat'
}))

app.use(setCurrentUser)
app.use(viewHelpers)


app.use('/', require('./controllers/session_controller'))
app.use('/', require('./controllers/dish_controller'))
app.use('/', usersController)


app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Server listening on port ${port}`)
})