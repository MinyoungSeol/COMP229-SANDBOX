let index = require('../controllers/index.server.controller')

module.exports = function(app){
    app.get('/api/get-incidents', index.render)
    app.post('/api/get-incidents/add', index.addIncident)
    app.delete('/api/get-incidents/delete', index.deleteIncident)
}