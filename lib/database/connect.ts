import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const cachedConnection = (global as any).mongoose || {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }
  if (!MONGODB_URL) {
    throw new Error("ADMIN must provide a MONGODB_URL ");
  }

  cachedConnection.promise =
    cachedConnection.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "udemy-clone",
      bufferCommands: false,
    });

  cachedConnection.conn = await cachedConnection.promise;
  console.log('Database connected!!!')
  return cachedConnection.conn;
};
