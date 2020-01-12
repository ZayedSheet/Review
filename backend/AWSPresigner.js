require('dotenv').config(); // Loading dotenv to have access to env variables
const AWS = require('aws-sdk'); // Requiring AWS SDK.

// Configuring AWS
AWS.config = new AWS.Config({
    accessKeyId: process.env.S3_KEY, // stored in the .env file
    secretAccessKey: process.env.S3_SECRET, // stored in the .env file
    region: process.env.BUCKET_REGION // This refers to your bucket configuration.
});

// Creating a S3 instance
const s3 = new AWS.S3();

// Retrieving the bucket name from env variable
const Bucket = process.env.BUCKET_NAME;

// PUT URL Generator
const generatePutUrl = (Key, ContentType) => {
    return new Promise((resolve, reject) => {
        // Note Bucket is retrieved from the env variable above.
        const params = { Bucket, Key, ContentType };
        // Note operation in this case is putObject
        s3.getSignedUrl('putObject', params, function(err, url) {
            if (err) {
                reject(err);
            }
            // If there is no errors we can send back the pre-signed PUT URL
            resolve(url);
        });
    });
};

// Finally, we export the methods so we can use it in our main application.
module.exports = {generatePutUrl };