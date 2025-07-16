const express = require('express');
const db = require('./Config/db');
const dotenv = require('dotenv')



const app = express();
db();
dotenv.config();



const port = process.env.PORT || 8000;
app.listen(prompt, ()=>{
    console.log(`server started at port ${port}`)
})

