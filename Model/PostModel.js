const mongoose = require('mongoose')
const PostSchema = mongoose.Schema


const CreatedPost = new PostSchema({
    Title: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Description: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model("CreatedPost", CreatedPost)