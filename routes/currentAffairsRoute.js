const router = require('express').Router();
const controller = require('../controller/currentAffairsController')

router.post('/createCurrentAffairs',
//middleware.token,
controller.createCurrentAffairs);

router.get('/getcurrentaffairsbyid',
//middleware.token,
controller.getCurrentAffairsById);

router.post('/getCurrentAffairs',
//middleware.token,
controller.getCurrentAffairs);

router.post('/updatecurrentaffairs',
controller.updateCurrentAffairs
)

router.post('/deletecurrentaffairs',
controller.deleteCurrentAffairs
)

router.get('/getcategorytype',
//middleware.token,
controller.getCategoryType);

router.post('/currentaffairsfornavigation',
controller.getCurrentAffairsNavigation

)

module.exports = router;