const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IncidentSchema = new Schema
(
    {
        caseNo:{
            type: Number,
            default: '',
            trim: true
        },
        category: {
            type: String,
            default: '',
            trim: true
        },
        created: {
            type: String,
            default: '',
            trim: true
        },
        updated: {
            type: String,
            default: '',
            trim: true
        },
        status: {
            type: String,
            default: '',
            trim: true
        }
        
    },
    {
        collection: 'incidents'
    }
)

module.exports = mongoose.model('Incident', IncidentSchema)