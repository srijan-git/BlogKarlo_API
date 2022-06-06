const express = require('express')
const router = express.Router()
const PostController = require("../Controller/Post.Controller")


router.post('/ProductCreation/:id', PostController.postCreation)
router.get('/PostDetails', PostController.getPostDetails)
router.get('/getPostContent/:id', PostController.getPostByID)
router.get('/ContentDelete/:id', PostController.DeletePostContent)
router.post('/ContentEdit', PostController.postContentEdit)


module.exports = router