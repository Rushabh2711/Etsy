var aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const config = require('../Config');

const bucketName = "etsy-bucket7";
const region = "us-east-2";

awsAccessKey = "AKIAZQF5VJMLNVW7C7UW";
awsSecretKey = "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";

// config.awsSecretKey;

const s3 = new aws.S3({
  region,
  awsAccessKey,
  awsSecretKey,
});

// Uploading files to the bucket

function uploadImage(key, body, contentType, res) {
  // Setting up S3 upload parameters
  let params = {
    Bucket: bucketName,
    Key: key, // File name you want to save as in S3
    Body: body,
    ContentType: contentType,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      res.status(400).send();
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    res.status(200).send(data.Location);
  });
}

module.exports = {uploadImage};