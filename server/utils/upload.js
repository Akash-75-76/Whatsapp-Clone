import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@whatsapp-clone-shard-00-00.2gaa2.mongodb.net:27017,whatsapp-clone-shard-00-01.2gaa2.mongodb.net:27017,whatsapp-clone-shard-00-02.2gaa2.mongodb.net:27017/?ssl=true&replicaSet=atlas-rlf7to-shard-0&authSource=admin&retryWrites=true&w=majority&appName=whatsapp-clone`,
    
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        // Define acceptable file types
        const match = ["image/png", "image/jpg", "image/jpeg"];
        

        // Check if the file type is acceptable
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        

        return {
            bucketName: 'fs', // Ensure this matches with your retrieval
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

export default multer({ storage });
