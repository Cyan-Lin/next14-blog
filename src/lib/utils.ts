import mongoose from "mongoose";

type Connection = {
  isConnected?: number;
};

const connection: Connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }

    if (process.env.MONGO_DB) {
      const db = await mongoose.connect(process.env.MONGO_DB, {
        dbName: "myBlog",
      });
      connection.isConnected = db.connections[0].readyState;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting to database");
  }
};
