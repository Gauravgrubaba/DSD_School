import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const response = await cloudinary.uploader.upload(
            filePath,
            {
                resource_type: "auto"
            }
        );

        fs.unlinkSync(filePath);
        return response;
    } catch (error) {
        fs.unlinkSync(filePath)
        return error;
    }
}

const uploadVideoOnCloudinary = async (localVideoPath) => {
    try {
        if (!localVideoPath) {
            console.error("No video path provided.");
            return null;
        }

        // Upload the file to Cloudinary with video-specific options
        const response = await cloudinary.uploader.upload(localVideoPath, {
            resource_type: "video", // 1. Set the resource type to "video"
            eager: [ // 2. Eagerly transform the video to create a web-optimized version
                {
                    width: 1280, // Target width 720p
                    height: 720,
                    crop: "pad", // Ensures the video fits into 1280x720 without distortion
                    format: 'mp4', // 3. Convert the format to mp4
                    video_codec: 'h264' // Use the standard H.264 codec
                }
            ],
            // This tells Cloudinary to do the conversion in the background
            // and not make the user wait for the upload to finish processing.
            eager_async: true
        });

        // The original file is uploaded, and the mp4 conversion is processing.
        // The response will contain the URL of the original file.
        console.log("Video uploaded to Cloudinary. Eager transformation is processing.");
        fs.unlinkSync(localVideoPath); // 4. Delete the temporary file from local server
        return response;

    } catch (error) {
        // If the upload fails, delete the local file
        fs.unlinkSync(localVideoPath);
        console.error("Error uploading video to Cloudinary: ", error);
        return null; // 5. Return null on failure for consistent error handling
    }
}

export default uploadOnCloudinary;

export {
    uploadVideoOnCloudinary
}