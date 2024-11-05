import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const Connection = async () => {
  const URL =`mongodb://${USERNAME}:${PASSWORD}@whatsapp-clone-shard-00-00.2gaa2.mongodb.net:27017,whatsapp-clone-shard-00-01.2gaa2.mongodb.net:27017,whatsapp-clone-shard-00-02.2gaa2.mongodb.net:27017/?ssl=true&replicaSet=atlas-rlf7to-shard-0&authSource=admin&retryWrites=true&w=majority&appName=whatsapp-clone`;
  
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error", error.message);
  }
};

export default Connection;
