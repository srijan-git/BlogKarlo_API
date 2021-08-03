const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const homeRouter = require('./Router/router')
const AdminRouter = require('./Router/Admin.router')
const path = require('path')

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



app.use(express.static(path.join(__dirname, 'Public')))
app.use('/UploadedImages', express.static(path.join(__dirname, 'UploadedImages')))


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'UploadedImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


//file.mimetype==='image/jpg/pdf etc'
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("png") ||
        file.mimetype.includes("jpg") ||
        file.mimetype.includes("jpeg")) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
app.use(multer({ storage: fileStorage, fileFilter: fileFilter, limits: { fieldSize: 1024 * 1024 * 5 } }).single('ProductImg'))


// mongodb + srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6ztzg.mongodb.net/${process.env.DB_NAME}

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.emmyy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
app.use(express.urlencoded({ extended: true }))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    next();
});
app.use(cors());




app.set('view engine', 'ejs');
app.set('views', 'View');
app.use(homeRouter)
app.use(AdminRouter)

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    //Promise sucess status
    if (result) {
        app.listen(process.env.PORT || 3500, () => {
            console.log("server running");
        })
    }
    else {
        console.log("Database not setup")
    }
}).catch((err) => {
    //Promise failure status
    console.log(err);
})