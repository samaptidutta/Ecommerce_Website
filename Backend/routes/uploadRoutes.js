const express = require('express');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier")

require("dotenv").config();
//cloudinary configuration

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//multer setup

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req,res) =>{
    try {
        if(!req.file){
            return res.status(400).json({message: "No file uploaded"});
        }


        //Function to handle the stream upload to Cloudinary
        const streamUpload = (filterBuffer) =>{
            return new Promise((resolve,reject) =>{
                const stream = cloudinary.uploader.upload_stream((error,result) =>{
                    if(result){
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

                //Use streamifier to convert file buffer to a stream
                streamifier.createReadStream(filterBuffer).pipe(stream);
            });
        };
        //Upload the image to Cloudinary
        const result = await streamUpload(req.file.buffer);
        //Return the uploaded image
        res.json({imageUrl: result.secure_url});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;