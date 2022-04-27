const express = require('express');
const authController = require('../Controller/AuthController')
const router = express.Router();

router.get('/getUserData', authController.getUserData)
router.get('/getEditedUserData/:id', authController.getEditedUserData);
router.post('/postuserEdit', authController.postUserEdit)
router.post('/postForm', authController.postRegister)
router.post('/postLogin', authController.postLogin)



module.exports = router;