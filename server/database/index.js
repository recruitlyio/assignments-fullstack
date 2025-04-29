const mongoose = require("mongoose");
require("dotenv").config();

// connect db method
const connectDB = async () => {
  try {
    // passing mongo uri
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    // if connected, able to see console
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    // else error
    console.error("Error connecting to MongoDB:", error);
  }
};

// calling this function
(async () => {
  await connectDB();
})();

module.exports = {
  connectDB,
};
