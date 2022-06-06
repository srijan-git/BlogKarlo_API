const PostModel = require("../Model/PostModel")

// --------------------AddPost---------------//
exports.postCreation = (req, res) => {
    const Id = req.params.id;
    const title = req.body.title
    const description = req.body.description
    const CreatedPost = new PostModel({ Title: title, userID: Id, Description: description })
    CreatedPost.save().then(result => {
        return res.status(200).json({
            status: true,
            message: "Post Created successfully",
            productdata: result
        })
    }).catch(err => {
        return res.status(401).json({
            status: false,
            message: "Not able to post Product "
        })
    })
}

// --------------------AddPost---------------//

// --------------------Get The Added Posts---------------//
exports.getPostDetails = (req, res) => {
    PostModel.find().sort({ Date: -1 }).then((postDetails) => {
        return res.status(200).json({
            status: true,
            message: "Post Details Feteched successfully",
            postDetails: postDetails
        })
    }).catch((err) => {
        return res.status(401).json({
            status: false,
            message: "Not able to fetech Product "
        })
    })
}
// --------------------Get The Added Products---------------//

// --------------------Get The Edited Products---------------//
exports.getPostByID = (req, res) => {
    const pId = req.params.id

    PostModel.findById(pId).then((post) => {
        return res.status(200).json({
            status: true,
            message: "Post Content Fetched successfully",
            PostContent: post
        })
    }).catch((err) => {
        return res.status(401).json({
            status: false,
            message: "Unsuccessful Attempt(getEditedProduct)"
        })
    })
}
// --------------------Get The Edited Products---------------//



// ------------------Deleting The data----------------//
exports.DeletePostContent = (req, res) => {
    const pId = req.params.id
    PostModel.deleteOne({ _id: pId }).then(result => {
        console.log("Product Delete sucessfully")
        return res.status(200).json({
            status: true,
            message: "Product Deleted successfully",
        })
    }).catch(err => {
        console.log(err)
        return res.status(401).json({
            status: false,
            message: "Unsuccessful Attempt(Delete)"
        })
    })
}
// ------------------Deleting The data----------------//

// ------------------Edit The data----------------//
exports.postContentEdit = (req, res) => {
    const PostId = req.body.PID;
    const title = req.body.Title
    const description = req.body.Description
    PostModel.findById(PostId).then(postContent => {
        console.log(postContent)
        if (postContent) {
            postContent.Title = title
            postContent.Description = description
            return postContent.save().then(data => {
                return res.status(200).json({
                    status: true,
                    message: "Content Edited successfully",
                    result: data
                })
            }).catch(updateError => {
                return res.status(401).json({
                    status: false,
                    message: "Content Edit Unsuccessfull",
                    result: updateError
                })
            })
        }
        else {
            console.log("oops");
        }
    }).catch(err => {
        return res.status(500).json({
            status: false,
            message: "Internal Server error...Not all the fields are filled up..kindly check!",
            result: err
        })
    })
}