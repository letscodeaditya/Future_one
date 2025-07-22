const User = require('../Model/user');

const signup = async(req,res)=>{

   const{name,email,password,role,phone,aadhaarNumber} = req.body;

   if(!name||!email||!password||!role||!phone||!aadhaarNumber){
        return res.status(400).json({message:'fill all detail'})
   }

   try{
        const userExit = User.findOne({email});
        if(userExit){
            return res.status(400).json({message:'user already exit'})
        }

        const user = await User.create(req.body);
        return res.status(200).json({message:'user created'})

   }catch(error){
        return res.status(500).json({message:'internal server error'})
   }
}


