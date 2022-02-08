const fileUpload = require('../services/fileUpload')
const whatsNewRepo = require('../repositories/whatsNewRepo')
const response = require('../response')


async function createWhatsNew(req, res, next) {
    try {
        let file = null;
        let s3Response = {};
        if (req.files && req.files.file) {
            file = req.files.file
            let fileName = file.name;
            s3Response = await fileUpload.uploadFile(fileName, file.data, 'whatsNew')
        };

        let { description, editor, hyperLink, whatsNewDate } = req.body
        const userId = req.headers.userId
        console.log("file object", file)

        console.log('s3Response==============>', s3Response)
        let whatsNewData = {
            description: description,
            editor: editor,
            hyperLink: hyperLink,
            pdfUpload: s3Response.Location,
            s3FileKey: s3Response.Key,
            whatsNewDate: whatsNewDate,
            userId: userId
        }

        let result = await whatsNewRepo.createWhatsNew(whatsNewData)
        if (result) {
           response.successFileUploadPost(res, result, "File");
        }
        else {
            response.error(res)
        }

    } catch (error) {
        response.error(res)
        
    }

}


async function deleteWhatsNew(req, res, next) {
    try {
        let { fileList, idList } = req.body
        console.log("file object", fileList)

        let s3Response = await fileUpload.deleteFile(fileList, 'whatsNew')
        console.log("dleted s3 response ====================>", s3Response)
        //console.log("file list id ================>",fileList.id)
        let whatsNewWhereCaluse = {
            id: idList
        }
        let result = whatsNewRepo.deleteWhatsNew(whatsNewWhereCaluse)
        if (result) {
            response.success(res, "Deleted WhatsNew successfully")
        }
        else {
            response.error(res);
        }

    } catch (error) {
        response.error(res)
    }

}

async function updateWhatsNew(req, res, next) {
    try {
        let { whatsNewId, description, editor, hyperLink, whatsNewDate, isNewFile } = req.body

        const userId = req.headers.userId

        let whatsNewWhereCaluse = {
            id: whatsNewId
        }
        let whatsNewResult = await whatsNewRepo.getWhatsNewByCondition(whatsNewWhereCaluse)
        let updatedS3FileKey = whatsNewResult.s3FileKey;
        let updatedImgUrl = whatsNewResult.imgUrl;


        if (whatsNewResult) {
            //Deleting Files from s3 Bucket 
            if (isNewFile == 'Y') {
                let file = req.files.file
                let fileName = file.name

                //let s3Filekey = updatedS3FileKey;
                if (updatedS3FileKey !== null && updatedS3FileKey !== '') {
                    let deleteFileList = [{
                        Key: updatedS3FileKey
                    }]
                    await fileUpload.deleteFile(deleteFileList, 'whatsNew')
                }
                let s3Response = await fileUpload.uploadFile(fileName, file.data, 'whatsNew')
                updatedS3FileKey = s3Response.Key;
                updatedImgUrl = s3Response.Location;
            }

            let whatsNewData = {
                description: description,
                editor: editor,
                hyperLink: hyperLink,
                pdfUpload: updatedImgUrl,
                s3FileKey: updatedS3FileKey,
                whatsNewDate: whatsNewDate,
                userId: userId
            }


            let whatsNewUpdate = whatsNewRepo.updateWhatsNew(whatsNewWhereCaluse, whatsNewData)
            if (whatsNewUpdate) {
                response.success(res, "Updated whatsNew successfully")
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
    createWhatsNew,
    deleteWhatsNew,
    updateWhatsNew
}
