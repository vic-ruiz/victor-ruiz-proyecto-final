import mongoose from "mongoose";
import "dotenv/config";

const config = {
  mongoDB: {
    URL: process.env.MONGO_PASS,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
  } catch (error) {
    console.log("Error en la conexión a mongoDB", error);
  }
};