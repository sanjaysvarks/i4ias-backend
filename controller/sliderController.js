const fileUpload = require('../services/fileUpload')


async function createSlider(req, res, next) {
    let file = req.files.file;
    console.log("file object", file)
    let fileName = file.name;
    let s3Response = await fileUpload.uploadFile(fileName, file.data, 'slider')
    console.log(' file --->', req.files)
    console.log(' Body --->', req.body)
    console.log("s3Response =====================>",s3Response)
    res.send({
        url: s3Response.Location
    })

}


module.exports = {
    createSlider
}