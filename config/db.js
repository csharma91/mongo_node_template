const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      userCreateIndex: true
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  
// Using Promise
  // mongoose.connect(db,{
  //     useNewUrlParser:true,
  //     useFindAndModify: false,
  //     useUnifiedTopology: true,
  //     userCreateIndex: true
  // }).then(() => console.log('MongoDB Connected'))
  // .catch(err =>{
  //     console.error(err.message)
  //     process.exit(1)
  // })
};

module.exports = connectDB;
