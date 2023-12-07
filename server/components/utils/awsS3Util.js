const AWS = require("aws-sdk");

// Set your AWS credentials
const credentials = new AWS.Credentials({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
});

// Configure the AWS SDK
AWS.config.credentials = credentials;
AWS.config.update({ region: "YOUR_AWS_REGION" }); // Replace with your AWS region

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload an object to S3 bucket
function uploadToS3(bucketName, fileName, fileData) {
  const params = {
    Bucket: bucketName,
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
function deleteFromS3(bucketName, fileName) {
  const params = {
    Bucket: bucketName,
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
