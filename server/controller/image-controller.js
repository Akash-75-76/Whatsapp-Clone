import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8001'; // Consider using an environment variable for production

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs' // Ensure this matches in upload and getImage
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs'); // Ensure this matches with the bucket name
});

// Upload image function
export const uploadImage = (request, response) => {
    if (!request.file) {
        console.log("File not found or upload failed");
        return response.status(404).json("File not found");
    }
    const imageUrl = `${url}/file/${request.file.filename}`;
    response.status(200).json(imageUrl);
}


// Get image function
export const getImage = async (request, response) => {
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename });

        // Check if the file exists
        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);

        // Handle stream errors
        readStream.on('error', (error) => {
            response.status(500).json({ msg: 'Error retrieving file', error });
        });
    } catch (error) {
        // Handle any unexpected errors
        response.status(500).json({ msg: error.message });
    }
}
