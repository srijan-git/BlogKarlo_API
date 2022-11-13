const express = require('express')
const router = express.Router()
const commentsController = require("../Controller/Comments.Controller")


router.post('/commentCreation/:postId/:userID', commentsController.commentCreation)
router.get('/CommentDetails', commentsController.getCommentDetails)

module.exports = router