const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(MONGO_URI,{    
        })
        console.log(`MongoDB connected in ${conn.connection.host}`)
    }
    catch(err){
        console.log(err.message)
        process.exit()
    }
}

module.exports = connectDB