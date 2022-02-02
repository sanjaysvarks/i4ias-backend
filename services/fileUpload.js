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

async function deleteFile(fileList, path){
    const BUCKET_NAME = process.env.BUCKET_NAME;
    // Setting up S3 upload parameters
    let fullPath = `${BUCKET_NAME}`
    const params = {
        Bucket: fullPath,
        Delete: {
            Objects: fileList,
            Quiet: false
        }
    };

    const s3 = new AWS.S3({
        accessKeyId: process.env.SES_ACCESS_KEY,
        secretAccessKey: process.env.SES_SECRET_KEY
    })

    //// Delete files From bucket
    let data = await s3.deleteObjects(params,
        ).promise();
        return data;
}
// s3.deleteObject(params, function(err, data) {
//     if (err) console.log(err, err.stack);  // error
//     else     console.log();                 // deleted
//   });


module.exports = {
    uploadFile,
    deleteFile
}
