const mongoose = require('mongoose')

const founderSchema = new mongoose.Schema({
    bio: {type:String},
    linkedinURL: {type:String}
    ,websiteURL: {type:String}
    ,experience: {type: String}
    ,startupsFounded: [{type: mongoose.Schema.Types.ObjectId, ref:'startup'}]
    ,createdAt: {type: Date, default:Date.now}
    ,domain :{type: String}
})

module.exports = mongoose.model('founderProfile',founderSchema)