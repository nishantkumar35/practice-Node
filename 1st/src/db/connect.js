const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log("db is connected");
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDB;