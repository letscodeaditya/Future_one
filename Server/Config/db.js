const mongoose = require('mongoose')

const dbConnect = async() => {
    try{
        const connect = await mongoose.connect(process.env.URL_MONGO);
        console.log("connected", connect.connection.host)
    }catch(error){
        console.log("failed", error.message);
        process.exit();
    }
}

module.exports = dbConnect;