const mongoose = require('mongoose')

const userVerification = new mongoose.Schema({
  entityType: { type: String, enum: ['investor','founder'], required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNote: { type: String },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, enum:['system','admin'] },
  verifiedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
})

const startupVerification = new mongoose.Schema({
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNote: { type: String },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, enum:['system','admin'] },
  verifiedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('userVer',userVerification);
module.exports = mongoose.model('startupVer',startupVerification);