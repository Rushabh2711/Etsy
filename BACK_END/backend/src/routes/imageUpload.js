const express = require('express');
const router = new express.Router();
var {uploadImage} = require('../routes/image');
const multer = require("multer");


const uploadItemImageMulter = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        console.log(req.file);
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/JPEG" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/JPG" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/PNG"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .jpg, .jpeg, .png files are allowed"));
      }
    },
  });


router.post("/imageUpload/:id",uploadItemImageMulter.single("image"), async (req,res,next)=>{
    try {
        uploadImage(req.params.id + ".png",req.file.buffer,req.file.mimetype,res);
    } catch (error) {
        
    }
    
});

module.exports = router;







