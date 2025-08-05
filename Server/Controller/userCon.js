const User = require('../Model/user');
const Founder = require('../Model/founderProfile');
const Investor = require('../Model/investorProfile');


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


const login = async(req,res)=>{

     const{email,password} = req.body;

     if(!email || !password){
          return res.status(400).json({message:'plz provide all data'})
     } 


     try{
     const user = await User.findOne({email});

     if(!user){
          return res.status(400).json({message:'user doesnt exit'})
     }

     if(user.kycVerified === 'false'){
          return res.status(400).json({verify: 'false', message: 'user not verified'})
     }

     const isMatch = (user.password === password); 
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }


     const userObj = user.toObject();


     delete userObj.password;
     delete userObj.aadhaarNumber;
     delete userObj.investorProfile;
     delete userObj.founderProfile;

     return res.status(200).json({
          message: 'login successful',
          user: userObj
     })

     }catch(error){
          console.error('login error', error);
          return res.status(500).json({message:'internal server error'})
     }
}


const roleDetail = async(req,res)=>{

     const{role, detail} = req.body;

     try{
    
          if(role === 'founder'){
               const founder = await Founder.create(detail);
               return res.status(200).json({message:'founder created'})
          }else{
               const investor = await Investor.create(detail);
               return res.status(200).json({message:'investor created'})
          }
          
     }catch(error){
          return res.status(500).json({message:'internal server error'})
     }


}


const getUserDetail = async(res,req)=>{

     const{userId,role} = res.body;

     if(!userId || !role){
          return res.status(400).json({message:'give all detail'})
     }

     try{
          if(role === 'founder'){
               const founderProfile = Founder.findById(userId);
               if(!founderProfile){
                    return res.status(400).json({message:'profile not found or not completed yet'})
               }
               return res.status(200).json({message:'profile found',founderProfile});
          }else{
               const investorProfile = Investor.findById(userId);
               if(!investorProfile){
                    return res.status(400).json({message:'profile not found or not completed yet'})
               }
               return res.status(200).json({message:'profile found',investorProfile});
          }
     }catch(error){
          return res.status(500).json({message:'internal server error'})
     }
}
