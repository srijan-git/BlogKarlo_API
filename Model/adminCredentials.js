const mongoose = require('mongoose')
const AdminSchema = mongoose.Schema


const AdminData = new AdminSchema({
    Email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model("Admin", AdminData)