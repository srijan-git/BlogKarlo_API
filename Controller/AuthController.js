const AuthModel = require("../Model/AuthModel")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

/*------------------------RegistrationSection----------------------------*/

//-----------------Connect to the cloudinary server to Store The images----------//
// const cloudinary = require('cloudinary').v2
// cloudinary.config({
//     cloud_name: 'dd1rtlezl',
//     api_key: '472355321544534',
//     api_secret: 'c7b7Lajl9Pt1K00JkMzmon9GxJE'
// });
//-----------------Connect to the cloudinary server to Store The images----------//

/*-----------------Get All User Details---------------------------*/
exports.getUserData = (req, res) => {
    AuthModel.find().then((user) => {
        return res.status(200).json({
            status: true,
            message: "user Fetched successfully",
            userData: user
        })
    }).catch((err) => {
        return res.status(401).json({
            status: false,
            message: "Not able to fetech Product "
        })
    })
}
/*-----------------Get All User Details---------------------------*/

/*-----------------Get edited User Details---------------------------*/
exports.getEditedUserData = (req, res) => {
    const Id = req.params.id;
    AuthModel.findById(Id).then((user) => {
        return res.status(200).json({
            status: true,
            message: "User Data Fetched successfully",
            userData: user
        })
    }).catch((err) => {
        return res.status(401).json({
            status: false,
            message: "Not able to fetech Product "
        })
    })
}
/*-----------------Get All User Details---------------------------*/


exports.postRegister = (req, res) => {
    let randomNumber = Math.floor(Math.random() * 1000)
    const fname = req.body.firstname
    const lname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    // const photoURL = "https://robohash.org/" + randomNumber;
    const photoURL = `https://ui-avatars.com/api/?name=${fname}+${lname}`;
    const interests = ""
    const bio = ""
    const hobbies = ""

    if (!fname) {
        return res.status(401).json({
            success: false,
            message: "first name is require"
        })
    }
    else if (!lname) {
        return res.status(401).json({
            success: false,
            message: "Last name is require"
        })
    } else if (!email) {
        return res.status(401).json({
            success: false,
            message: "Email is require"
        })
    } else if (!password) {
        return res.status(401).json({
            success: false,
            message: "Password is require"
        })
    }
    else {
        const userValue = new AuthModel({ firstname: fname, lastname: lname, email: email, password: password, photoURL: photoURL, interests: "", bio: "", hobbies: "" })

        AuthModel.findOne({ email: email }).then(emailExist => {
            if (emailExist) {
                return res.status(401).json({
                    success: false,
                    message: "Email already exists"
                })
            } else {
                return userValue.save().then(result => {
                    return res.status(200).json({
                        success: true,
                        message: "Successfully Registered..!"
                    })

                }).catch(err => {
                    return res.status(401).json({
                        success: false,
                        message: err
                    })
                })
            }
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })

        })
    }
}

/*------------------------LoginSection----------------------------*/

exports.postLogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(email, password)

    if (!email) {
        return res.status(401).json({
            success: false,
            message: "Email is require"
        })
    } else if (!password) {
        return res.status(401).json({
            success: false,
            message: "Password is require"
        })
    } else {
        AuthModel.findOne({ email: email }).then(loginValue => {
            if (loginValue) {
                const jwt_token = jwt.sign({ email: loginValue.email }, "ABCD", { expiresIn: '1h' })
                return res.status(200).json({
                    success: true,
                    message: "Successfully Login",
                    token: jwt_token,
                    result: loginValue
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Credentials...."
                })
            }
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        })
    }
}

/*------------------------User Self Details Edit----------------------------*/

exports.postUserEdit = (req, res) => {
    const UserID = req.body.UserID
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const interests = req.body.interests
    const hobbies = req.body.hobbies
    const bio = req.body.bio


    AuthModel.findById(UserID).then(user => {
        if (user) {
            user.firstname = firstname
            user.lastname = lastname
            user.interests = interests
            user.bio = bio
            user.hobbies = hobbies
            return user.save().then(data => {
                return res.status(200).json({
                    status: true,
                    message: "Users Data Edited successfully",
                    result: data
                })
            }).catch(uploadError => {
                return res.status(401).json({
                    status: false,
                    message: " Post User Edit Unsuccessfull",
                    result: uploadError
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