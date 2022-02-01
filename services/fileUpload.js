const AWS = require('aws-sdk');

async function uploadFile(fileName, fileContent, path) {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    // Setting up S3 upload parameters
    let fullPath = `${BUCKET_NAME}/${path}`
    const params = {
        Bucket: fullPath,
        Key: fileName,// File name you want to save as in S3
        Body: fileContent
    };

    const s3 = new AWS.S3({
        accessKeyId: process.env.SES_ACCESS_KEY,
        secretAccessKey: process.env.SES_SECRET_KEY
    });

    // Uploading files to the bucket
    let data = await s3.upload(params,
    ).promise();
    return data;
};


module.exports = {
    uploadFile
}
