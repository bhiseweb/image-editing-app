const addImageController = require('../controller/addImageController') 
const express = require('express'),
    router = express.Router();
const upload = require('../config/upload')

router.post('/images',upload.single('avatar'), addImageController.saveImage)
router.get('/images', addImageController.getImage)

module.exports = router;