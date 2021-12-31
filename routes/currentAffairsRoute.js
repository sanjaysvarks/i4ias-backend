const router = require('express').Router();
const controller = require('../controller/currentAffairsController')
const middleware = require('../middleware/tokenValidation') 
const currentAffairsMiddleware = require('../middleware/currentAffairsMiddleware')

router.post('/createCurrentAffairs',
middleware.token,
currentAffairsMiddleware.createCurrentAffairs,
controller.createCurrentAffairs);

router.get('/getcurrentaffairsbyid',
//middleware.token,
controller.getCurrentAffairsById);

//router.post('/getCurrentAffairs',
//middleware.token,
//controller.getCurrentAffairs);

router.get('/getallcurrentaffairs',
///middleware.token,
controller.getAllCurrentAffairs);



router.post('/updatecurrentaffairs',
middleware.token,
currentAffairsMiddleware.updateCurrentAffairsData,
controller.updateCurrentAffairs
)

router.post('/deletecurrentaffairs',
middleware.token,
currentAffairsMiddleware.deleteCurrentAffairs,
controller.deleteCurrentAffairs
)

router.get('/getcategorytype',
middleware.token,
controller.getCategoryType);

router.post('/currentaffairsfornavigation',
middleware.token,
currentAffairsMiddleware.getCurrentAffairsNavigation,
controller.getCurrentAffairsNavigation
)

router.get('/getcurrentaffairsbytag',
//middleware.token,
controller.getCurrentAffairsByTag
)

router.get('/getcurrentaffairsbydate',
//middleware.token,
controller.getCurrentAffairsByDate
)

router.get('/currentaffairs/downloadpdf',
//middleware.token,
controller.downloadpdf
)

router.get('/getdateforfoldername',
//middleware.token,
controller.getDateForFolderName
)




module.exports = router;