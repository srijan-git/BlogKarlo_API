const express = require('express')
const router = express.Router()
const AdminController = require("../Controller/Admin.Controller")


router.get('/getProductName', AdminController.getProductName)
router.post('/postProduct', AdminController.postProduct)
router.get('/getProductdata', AdminController.getproductData)
router.get('/getEditedProduct/:pId', AdminController.getEditedProduct)
router.post('/postproductEdit', AdminController.postproductEdit)
router.get('/productDelete/:pId', AdminController.productDelete)
module.exports = router