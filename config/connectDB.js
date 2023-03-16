const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`\x1b[95m\x1b[4mMongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
