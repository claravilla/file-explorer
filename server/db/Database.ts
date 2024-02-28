import mongoose from "mongoose";
import "dotenv/config";

export function connectDB() {
  const url = process.env.MONGODB_URI as string;

  try {
    mongoose.connect(url);
  } catch (err) {
    console.error("Error connecting to mongo: ", err);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
