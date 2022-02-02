const fileUpload = require('../services/fileUpload')
const sliderRepo = require('../repositories/sliderRepo')
const response = require('../response')

async function createSlider(req, res, next) {
    let file = req.files.file;
    let { heading, description, isPrimary } = req.body
    const userId = req.headers.userId
    console.log("file object", file)
    let fileName = file.name;
    let s3Response = await fileUpload.uploadFile(fileName, file.data, 'slider')
    console.log('s3Response==============>', s3Response)
    let sliderData = {
        heading: heading,
        description: description,
        imgUrl: s3Response.Location,
        s3FileKey: s3Response.Key,
        isPrimary: isPrimary,
        userId: userId
    }

    let result = await sliderRepo.createSlider(sliderData)
    if (result) {
        response.successPost(res, result, "slider");
    }
    else {
        response.error(res)
    }
    // console.log(' file --->', req.files)
    // console.log(' Body --->', req.body)
    // console.log("s3Response =====================>",s3Response)
    // res.send({
    //     url: s3Response.Location
    // })

}

async function deleteSlider(req, res, next) {
    let { fileList } = req.body
    console.log("file object", fileList)

    let s3Response = await fileUpload.deleteFile(fileList, 'slider')
    console.log("dleted s3 response ====================>", s3Response)
    //console.log("file list id ================>",fileList.id)
    // let result = sliderRepo.deleteSlider(fileList)
    // if (result) {
    //     response.success(res, "Deleted slider successfully")
    // }
    // else {
    //     response.error(res);
    // }


}


async function getHomePageResponse(req, res, next) {
    let allRes = {
        slider: [],
        ticker:[],
        testimonial:[],
        whatsNew:[]
    }
    let sliderResult = await sliderRepo.getSlider()
    if (sliderResult) {
        allRes.slider = sliderResult;
    }

    response.successGet(res, allRes);

}


module.exports = {
    createSlider,
    deleteSlider,
    getHomePageResponse
}