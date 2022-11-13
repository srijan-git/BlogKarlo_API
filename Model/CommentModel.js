const mongoose = require('mongoose')
const commentsSchema = mongoose.Schema


const CreatedComments = new commentsSchema({
    Comments: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    postID: {
        type: String,
        require: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("CreatedComments", CreatedComments)