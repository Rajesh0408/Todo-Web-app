const mongoose = require("mongoose");


const connectMongodb = async() => {
    try{
        await mongoose.connect(process.env.CONNECTIONURL);
        console.log("Connected to mongodb");
    }catch(error) {
        console.log(error.message);
        process.exit(1);
    }
   
}

module.exports = connectMongodb;