const fileUpload = require('../services/fileUpload')
const tickerRepo = require('../repositories/tickerRepo')
const response = require('../response')


async function createTicker(req, res, next) {
    try {
        let file = null;
        let s3Response = {};

        if (req.files && req.files.file) {
            file = req.files.file;
            let fileName = file.name;
            s3Response = await fileUpload.uploadFile(fileName, file.data, 'ticker')
        }

        let { description, hyperLinkUrl } = req.body
        const userId = req.headers.userId

        console.log('s3Response==============>', s3Response)
        let tickerData = {
            description: description,
            hyperLinkUrl: hyperLinkUrl,
            documentUrl: s3Response.Location,
            s3FileKey: s3Response.Key,
            userId: userId
        }

        let result = await tickerRepo.createTicker(tickerData)
        if (result) {
            response.successPost(res, result, "ticker");
        }
        else {
            response.error(res)
        }

    } catch (error) {
        response.error(res)
    }

}


async function deleteTicker(req, res, next) {
    try {
        let { fileList, idList } = req.body
        console.log("file object", fileList)

        let s3Response = await fileUpload.deleteFile(fileList, 'ticker')
        console.log("dleted s3 response ====================>", s3Response)
        //console.log("file list id ================>",fileList.id)
        let tickerWhereCaluse = {
            id: idList
        }
        let result = tickerRepo.deleteTicker(tickerWhereCaluse)
        if (result) {
            response.success(res, "Deleted Ticker successfully")
        }
        else {
            response.error(res);
        }

    } catch (error) {
        response.error(res)
    }

}

async function updateTicker(req, res, next) {
    try {
        let { tickerId, description, hyperLinkUrl, isNewFile } = req.body

        const userId = req.headers.userId

        let tickerWhereCaluse = {
            id: tickerId
        }
        let tickerResult = await tickerRepo.getTickerByCondition(tickerWhereCaluse)
        let updatedS3FileKey = tickerResult.s3FileKey;
        let updatedImgUrl = tickerResult.imgUrl;


        if (tickerResult) {
            //Deleting Files from s3 Bucket 
            if (isNewFile == 'Y') {
                let file = req.files.file
                let fileName = file.name

                //let s3Filekey = updatedS3FileKey;
                if (updatedS3FileKey !== null && updatedS3FileKey !== '') {
                    let deleteFileList = [{
                        Key: updatedS3FileKey
                    }]
                    await fileUpload.deleteFile(deleteFileList, 'ticker')
                }
                let s3Response = await fileUpload.uploadFile(fileName, file.data, 'ticker')
                updatedS3FileKey = s3Response.Key;
                updatedImgUrl = s3Response.Location;
            }

            let tickerData = {
                description: description,
                hyperLinkUrl: hyperLinkUrl,
                documentUrl: updatedImgUrl,
                s3FileKey: updatedS3FileKey,
                userId: userId
            }



            let tickerUpdate = tickerRepo.updateTicker(tickerWhereCaluse, tickerData)
            if (tickerUpdate) {
                response.success(res, "Updated ticker successfully")
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
    createTicker,
    deleteTicker,
    updateTicker
}
