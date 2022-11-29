require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const compress = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const session = require('express-session')
const cors = require('cors')
let MongoStore = require('connect-mongo')
let passport = require('passport')
let passportLocal = require('passport-local').Strategy
let crypto              = require('crypto')
let User                = require('../app/models/user.server.model')
let { validPassword }   = require('./passwordAuth')

module.exports = function(){
    const app = express()

    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'))
    } 
    else if(process.env.NODE_ENV === 'production'){
        app.use(compress()) //'dev'
    }

    require('./mongoose')(app)

    const sessionStore = MongoStore.create({
        mongoUrl: process.env.db,
        autoRemove: 'interval',
        autoRemoveInterval: 10,
        collectionName: 'sessions'
    })

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    //app.use(bodyParser.json())
    app.use(express.json())
    app.use(methodOverride())
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.sessionSecret,
        store: sessionStore,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    }))

    require('./passport')(passport)

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(cors({
        origin: '*'
    }))

    app.use(express.static('./public'))

    require('../app/routes/index.server.routes')(app) //(app)
    require('../app/routes/user.server.routes')(app)

    return app
}
