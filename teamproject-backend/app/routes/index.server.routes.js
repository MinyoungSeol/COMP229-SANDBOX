let index = require('../controllers/index.server.controller')

module.exports = function(app){
    app.get('/api/get-incidents', index.render)
}