const fileUpload = require('../services/fileUpload')
const testimonialRepo = require('../repositories/testimonialRepo')
const response = require('../response')

async function createTestimonial(req, res, next) {
    try {
        let file = req.files.file;
        let { name, designation, description } = req.body
        const userId = req.headers.userId
        console.log("file object", file)
        let fileName = file.name;
        let s3Response = await fileUpload.uploadFile(fileName, file, 'testimonial')
        console.log('s3Response==============>', s3Response)
        let testimonialData = {
            name: name,
            designation: designation,
            description: description,
            profileImage: s3Response.Location,
            s3FileKey: s3Response.Key,
            userId: userId
        }

        let result = await testimonialRepo.createTestimonial(testimonialData)
        if (result) {
            response.successFileUploadPost(res, result, "File");
        }
        else {
            response.error(res)
        }

    } catch (error) {
        console.log("error===>",error)
        response.error(res)
    }

}

async function deleteTestimonial(req, res, next) {
    try {
        let { fileList, idList } = req.body
        console.log("file object", fileList)

        let s3Response = await fileUpload.deleteFile(fileList, 'testimonial')
        console.log("dleted s3 response ====================>", s3Response)
        //console.log("file list id ================>",fileList.id)
        let testimonialWhereCaluse = {
            id: idList
        }
        let result = testimonialRepo.deleteTestimonial(testimonialWhereCaluse)
        if (result) {
            response.success(res, "Deleted Testimonial successfully")
        }
        else {
            response.error(res);
        }

    } catch (error) {
        response.error(res)
    }

}

async function updateTestimonial(req, res, next) {
    try {
        let { testimonialId, name,designation, description,isNewFile } = req.body
        
        const userId = req.headers.userId
        
        let testimonialWhereCaluse = {
            id: testimonialId
        }
        let testimonialResult = await testimonialRepo.getTestimonialByCondition(testimonialWhereCaluse)
        let updatedS3FileKey = testimonialResult.s3FileKey;
        let updatedImgUrl = testimonialResult.imgUrl;
       
        
        if (testimonialResult) {
            //Deleting Files from s3 Bucket 
            if (isNewFile == 'Y') {
                let file = req.files.file
                let fileName = file.name
               
                //let s3Filekey = updatedS3FileKey;
                let deleteFileList = [{
                    Key: updatedS3FileKey
                }]
                await fileUpload.deleteFile(deleteFileList, 'testimonial')
                let s3Response = await fileUpload.uploadFile(fileName, file, 'testimonial')
                updatedS3FileKey = s3Response.Key;
                updatedImgUrl = s3Response.Location;
            }

            let testimonialData = {
                name: name,
                designation: designation,
                description: description,
                profileImage: updatedImgUrl,
                s3FileKey: updatedS3FileKey,
                userId: userId
            }

            let testimonialUpdate = testimonialRepo.updateTestimonial(testimonialWhereCaluse, testimonialData)
            if (testimonialUpdate) {
                response.success(res, "Updated testimonial successfully")
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
    createTestimonial,
    deleteTestimonial,
    updateTestimonial
}