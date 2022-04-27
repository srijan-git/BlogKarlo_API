const CommentModel = require("../Model/CommentModel")


// --------------------AddProduct---------------//
exports.commentCreation = (req, res) => {
    const postID = req.params.postId;
    const userID = req.params.userID;
    const comments = req.body.comments
    const CreatedPost = new CommentModel({ postID: postID, userID: userID, Comments: comments })

    CreatedPost.save().then(result => {
        return res.status(200).json({
            status: true,
            message: "Comment Created successfully",
            Comments: result
        })
    }).catch(err => {
        return res.status(401).json({
            status: false,
            message: "Not able to Comment"
        })
    })
}

// --------------------AddProduct---------------//

// --------------------Get The Added Posts---------------//
exports.getCommentDetails = (req, res) => {
    CommentModel.find().sort({ Date: -1 }).then((CommentDetails) => {
        return res.status(200).json({
            status: true,
            message: "Comment Details Feteched successfully",
            commentDetails: CommentDetails
        })
    }).catch((err) => {
        return res.status(401).json({
            status: false,
            message: "Not able to fetech Comment "
        })
    })
}
// --------------------Get The Added Products---------------//
