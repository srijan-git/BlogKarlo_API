const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const AuthRouter = require('./Router/router')
const PostRouter = require('./Router/Post.router')
const CommentsRouter = require('./Router/Comments.router')
// const fileupload = require('express-fileupload')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.baeyr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

app.use(express.urlencoded({ extended: true }))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
// app.use(fileupload({
//     useTempFiles: true
// }))
app.use(cors());




app.set('view engine', 'ejs');
app.set('views', 'View');
app.use(AuthRouter)
app.use(PostRouter)
app.use(CommentsRouter)
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