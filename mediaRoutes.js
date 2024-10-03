
    
const express = require('express');  
const router = express.Router();     
const mediaController = require('../controllers/mediaController');

// Create a new media entry
router.post('/media', mediaController.createMedia);
// 

// Get media entry by mobile number
router.get('/media/:mobile_number', mediaController.getMediaByMobileNumber);

// Update media entry by mobile number
router.put('/media/:mobile_number', mediaController.updateMediaByMobileNumber);

// Delete media entry by media ID
router.delete('/media/:media_id', mediaController.deleteMediaByMediaId);

module.exports = router;