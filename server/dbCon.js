const mongoose = require("mongoose");
const dbConnect = async () => {
  const mongoUri =
    "mongodb+srv://ram:ram@cluster0.icqmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  try {
    let mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const conn = await mongoose.connect(mongoUri, mongooseOptions);
    console.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = dbConnect;
