const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

// optional: catch connection errors that happen after initial connect
mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err.message);
});

module.exports = connectDB;