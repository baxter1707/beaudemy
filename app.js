const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

const mustacheExpress = require('mustache-express')
const methodOverride = require('method-override')
const expressValidator = require('express-validator')
const SERVER_CONFIGS = require('./constants/server')
const configureServer = require('./server')

app.use(bodyParser.urlencoded({extended:false}))
app.engine('mustache', mustacheExpress())
app.use(methodOverride('_method'))
app.use(expressValidator())
app.set('view engine', 'mustache')
app.set('views', './views')

app.get('/', (req,res) => {
  res.render('home')
})


app.listen(SERVER_CONFIGS.PORT, error =>{
  if (error) throw error;
  console.log('Serving is running on port: ' + SERVER_CONFIGS.PORT)
})
