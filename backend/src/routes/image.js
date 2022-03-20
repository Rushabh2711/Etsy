var aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const config = require('../Config');

const bucketName = "etsy-bucket7";

awsAccessKey = "AKIAZQF5VJMLAMCD26BC";
awsSecretKey = "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";
// config.awsSecretKey;
aws.config.update({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretKey,
});

const s3 = new aws.S3();

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
      res.status(400).send(err);
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    res.status(200).send(data.Location);
  });
}

module.exports = {uploadImage};