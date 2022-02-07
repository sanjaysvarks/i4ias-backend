const fileUpload = require('../services/fileUpload')
const sliderRepo = require('../repositories/sliderRepo')
const testimonialRepo = require('../repositories/testimonialRepo')
const tickerRepo = require('../repositories/tickerRepo')
const whatsNewRepo = require('../repositories/whatsNewRepo')
const response = require('../response')

async function createSlider(req, res, next) {
    try {
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

    } catch (error) {
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
    try {
        let { fileList, idList } = req.body
        console.log("file object", fileList)

        let s3Response = await fileUpload.deleteFile(fileList, 'slider')
        console.log("dleted s3 response ====================>", s3Response)
        //console.log("file list id ================>",fileList.id)
        let sliderWhereCaluse = {
            id: idList
        }
        let result = sliderRepo.deleteSlider(sliderWhereCaluse)
        if (result) {
            response.success(res, "Deleted slider successfully")
        }
        else {
            response.error(res);
        }

    } catch (error) {
        response.error(res)
    }

}


async function getHomePageResponse(req, res, next) {
    try {
        let allRes = {
            slider: [],
            ticker: [],
            testimonial: [],
            whatsNew: []
        }
        let sliderResult = await sliderRepo.getSlider()
        if (sliderResult) {
            allRes.slider = sliderResult;
        }

        let testimonialResult = await testimonialRepo.getTestimonial()
        if (testimonialResult) {
            allRes.testimonial = testimonialResult;
        }

        let tickerResult = await tickerRepo.getTicker()
        if (tickerResult) {
            allRes.ticker = tickerResult;
        }

        let whatsNewResult = await whatsNewRepo.getWhatsNew()
        if (whatsNewResult) {
            allRes.whatsNew = whatsNewResult;
        }

         console.log('allRes.whatsNew===>',allRes.whatsNew)

        response.successGet(res, allRes);
    } catch (error) {
        response.error(error)
    }
}

async function updateSlider(req, res, next) {
    try {
        let { sliderId, heading, description, isPrimary, isNewFile } = req.body
        const userId = req.headers.userId

        let sliderWhereCaluse = {
            id: sliderId
        }

        let sliderResult = await sliderRepo.getSliderByCondition(sliderWhereCaluse)
        let updatedS3FileKey = sliderResult.s3FileKey;
        let updatedImgUrl = sliderResult.imgUrl;

        if (sliderResult) {
            //Deleting Files from s3 Bucket 
            if (isNewFile == 'Y') {
                let file = req.files.file
                let fileName = file.name
                //let s3Filekey = updatedS3FileKey;
                let deleteFileList = [{
                    Key: updatedS3FileKey
                }]
                await fileUpload.deleteFile(deleteFileList, 'slider')
                let s3Response = await fileUpload.uploadFile(fileName, file.data, 'slider')
                updatedS3FileKey = s3Response.Key;
                updatedImgUrl = s3Response.Location;
            }

            let sliderData = {
                heading: heading,
                description: description,
                imgUrl: updatedImgUrl,
                s3FileKey: updatedS3FileKey,
                isPrimary: isPrimary,
                userId: userId
            }

            let sliderUpdate = sliderRepo.updateSlider(sliderWhereCaluse, sliderData)
            if (sliderUpdate) {
                response.success(res, "Updated Slider successfully")
            }
            else {
                response.error(res);
            }

        } else {
            response.error(res);
        }

    } catch (error) {

        response.error(res);
    }
}



module.exports = {
    createSlider,
    deleteSlider,
    getHomePageResponse,
    updateSlider
}