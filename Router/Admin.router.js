const express = require('express')
const router = express.Router()
const AdminController = require("../Controller/Admin.Controller")


router.get('/getProductName', AdminController.getProductName)
router.post('/postProduct', AdminController.postProduct)
router.get('/getProductdata', AdminController.getproductData)
router.get('/productEdit/:pId', AdminController.getEditedProduct)
router.post('/PostproductEdit', AdminController.postproductEdit)
router.get('/productDelete/:pId', AdminController.productDelete)
module.exports = router