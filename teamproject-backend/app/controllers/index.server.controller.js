let Incident = require('../models/incident.server.model')

exports.render = function (req, res) {
    if (req.session.lastVisit) {
        console.log(`Last visited: ${req.session.lastVisit}`);
    }
    req.session.lastVisit = new Date()

    try{
        Incident.find({}, (err, incidents) => {
            if(err){
                res.json(err)
                return next(err)
            }
            else{
                res.json(incidents)
            }
        })
    }
    catch (error) {
        res.json(error)
        next(error)
    }
}