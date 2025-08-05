const mongoose = require('mongoose')

const allowedDomains = [
  "SaaS", "AI / Machine Learning", "Blockchain", "Cybersecurity",
  "EdTech", "FinTech", "HealthTech", "BioTech", "CleanTech",
  "E-commerce", "D2C", "Food & Beverages", "Fashion",
  "PropTech", "LegalTech", "AgriTech", "Mobility", "Smart Cities",
  "CRM / ERP", "TravelTech", "Social Impact", "SpaceTech", "AR / VR"
];

const startupSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  industry: { type: String },
  domain: { type: String, enum: allowedDomains, required: true },
  pitchDeckURL: { type: String },
  cinNumber: { type: String },
  gstNumber: { type: String },
  verified: { type: Boolean, default: false },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('StartUp',startupSchema)