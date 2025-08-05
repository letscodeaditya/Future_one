const mongoose = require('mongoose');

const defaultImages = {
    seller: [
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/mqrt2vsiu0rks9gxz0if.png",
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/murqweh6j35pscp7hkml.png",
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/dbttvdwylxks6hxgybkx.png",
    ],
    buyer: [
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/kl2kpiuyhv9z5gbvp111.png",
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/q5kryu8iz6bvkrzsip2d.png",
    ]
  };

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique: true},
    password:{type:String, required:true},
    role:{type:String, enum:['founder','investor']},
    kycVerified: {type:Boolean, default: false},
    phone: {type:String, required:true},
    aadhaarNumber:{type:String},
    founderProfile:{type: mongoose.Schema.ObjectId, ref:'FounderProfile'},
    investorProfile:{type: mongoose.Schema.ObjectId, ref:'investorProfile'},
    createdAt: {type: Date, default:Date.now},
    isProfileComplete: { type: Boolean, default: false },
    pic: {
        type: String,
        default: function () {
          // Get the array of image paths based on the user's gender
          const images = defaultImages[this.userType];
          // Select a random image path from the array
          const randomIndex = Math.floor(Math.random() * images.length);
          return images[randomIndex];
        },
    },
})


userSchema.pre('save', function(next){
    if(this.role === 'founder' && this.investorProfile){
        return next(new Error('investor profile must be null for founder'))
    }
    if(this.role === 'investor' && this.founderProfile){
        return next(new Error('founder profile must be null for investor'))
    }
})


module.exports = mongoose.model('user',userSchema)

