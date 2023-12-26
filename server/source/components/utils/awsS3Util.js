const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

// Set your AWS credentials
const credentials = new AWS.Credentials({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// Configure the AWS SDK
AWS.config.credentials = credentials;
AWS.config.update({ region: "ap-southeast-1" });

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload an object to S3 bucket
function uploadToS3(fileName, fileData) {
  const params = {
    Bucket: "crealink-images",
    Key: fileName,
    Body: fileData,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Function to delete an object from S3 bucket
function deleteFromS3(fileName) {
  const params = {
    Bucket: "crealink-images",
    Key: fileName,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  uploadToS3,
  deleteFromS3,
};
