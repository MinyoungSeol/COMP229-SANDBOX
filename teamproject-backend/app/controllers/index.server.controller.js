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

exports.addIncident = (req, res) => {
    try{
        let incident = new Incident({
            caseNo: req.body.caseNo,
            category: req.body.category,
            created: req.body.created,
            updated: req.body.updated,
            status: req.body.status
        })

        console.log(`incident: ${incident.caseNo} / ${incident.category}`);
        
        incident.save((err, incident) => {
            if(err) {
                console.log('error: ' + err);
                return res.status(502).json({ err: err, msg: 'Error inside insertOne'})
            } else {
                console.log('Rendered from addIncident');
                return res.json(`Sucessfully Added ${ incident.caseNo }`)
            }
        })
    } catch (error) {
        return res.status(502).json({ error: error, msg: 'Error inside Catch'})
    }
}