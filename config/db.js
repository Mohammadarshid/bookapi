const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected To Database successfully  ${mongoose.connection.host} `.white.bgGreen
    );
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectdb;
