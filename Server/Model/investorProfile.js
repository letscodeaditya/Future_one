const mongoose = require('mongoose')

const investorSchema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId, required: true},
  bio: { type: String },
  linkedinURL: { type: String },
  portfolioeURL: { type: String },
  investmentInterests: [{ type: String }], 
  investmentsMade: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investment' }],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Investor',investorSchema)