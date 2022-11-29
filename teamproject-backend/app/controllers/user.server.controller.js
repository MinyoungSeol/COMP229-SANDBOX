let Task = require('../models/incident.server.model')
let { genPassword } = require('../../config/passwordAuth')
let passport = require('passport')
const User = require('../models/user.server.model')


exports.getUserInfo = (req, res) => {
    const user = req.body.user
    console.log('user from getUserInfo: ' + user);
    return res.json(user)
}

exports.loginUser = (req, res) => {
    passport.authenticate('local', { failureMessage: 'Could not Authenticate', successMessage: 'Successfully Authenticated User'})
    console.log(`Username: ${ req.body.username }`)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    })
    return res.status(200).json(user)
}

exports.registerUser = (req, res) => {
    const saltHash = genPassword(req.body.password)
    
    const salt = saltHash.salt
    const hash = saltHash.hash

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
        hash: hash,
        salt: salt
    })

    newUser.save()
    .then((user) => {
        console.log(`User: ${ user }`)
    })

    res.json(`Registered User: ${ user.username }`)
}

exports.logoutUser = (req, res) => {
    req.logout()
    res.json(`Logged out successfully!`)
}