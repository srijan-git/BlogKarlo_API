const ProductModel = require("../Model/AdminProductModel")

//-----------------Connect to the cloudinary server to Store The images----------//
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dd1rtlezl',
    api_key: '472355321544534',
    api_secret: 'c7b7Lajl9Pt1K00JkMzmon9GxJE'
});
//-----------------Connect to the cloudinary server to Store The images----------//


exports.getProductName = (req, res) => {
    res.render('Admin/addProduct')
}


//--------------------AddProduct---------------//
exports.postProduct = (req, res) => {
    console.log(req.body);
    const title = req.body.title
    const description = req.body.description
    const ProductImg = req.files.ProductImg
    const ProductPrice = req.body.ProductPrice
    cloudinary.uploader.upload(ProductImg.tempFilePath, (err, result) => {
        console.log(result);
        const ProductDetails = new ProductModel(
            {
                title: title,
                description: description,
                ProductImg: result.url,
                ProductPrice: ProductPrice
            })

        ProductDetails.save().then(result => {
            console.log("Product Addess", result)
            return res.status(200).json({
                status: true,
                message: "Product Fetched successfully",
                productdata: result
            })
        }).catch(err => {
            console.log(err)
            return res.status(401).json({
                status: false,
                message: "Not able to post Product "
            })
        })
    })
}
//--------------------AddProduct---------------//


//--------------------Product Edit---------------//

exports.postproductEdit = (req, res) => {
    const pId = req.body.pId
    const title = req.body.title
    const description = req.body.description
    const ProductImg = req.files.ProductImg
    const ProductPrice = req.body.ProductPrice


    cloudinary.uploader.upload(ProductImg.tempFilePath, (err, result) => {
        console.log(result);

        ProductModel.findById(pId).then(product => {
            if (product) {
                product.title = title
                product.description = description
                product.ProductImg = result.url
                product.ProductPrice = ProductPrice

                return product.save().then(data => {
                    console.log("Product Updated Sucessfully", data)
                    return res.status(200).json({
                        status: true,
                        message: "Product Edited successfully"
                    })
                }).catch(err => {
                    console.log("Data Not saved", err)
                    return res.status(401).json({
                        status: false,
                        message: " Post Product Edit Unsuccessfully"
                    })
                })
            }
            else {
                res.redirect('/getProductdata')
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).json({
                status: false,
                message: "Internal Server error"
            })
        })


    })

}
//--------------------Product Edit---------------//



//--------------------Get The Added Products---------------//
exports.getproductData = (req, res) => {
    ProductModel.find().then((product) => {
        console.log(product)
        return res.status(200).json({
            status: true,
            message: "Product Fetched successfully",
            productdata: product
        })
    }).catch((err) => {
        console.log(err)
        return res.status(401).json({
            status: false,
            message: "Not able to fetech Product "
        })
    })
}
//--------------------Get The Added Products---------------//


//--------------------Get The Edited Products---------------//
exports.getEditedProduct = (req, res) => {
    //To collect the product id form URL
    const pId = req.params.pId

    ProductModel.findById(pId).then(product => {
        console.log(product)
        return res.status(200).json({
            status: true,
            message: "ProductData Edited successfully",
        })
    }).catch((err) => {
        console.log(err)
        return res.status(401).json({
            status: false,
            message: "Product Edit Unsuccessfully"
        })
    })
}
//--------------------Get The Edited Products---------------//



//------------------Deleting The data----------------//
exports.productDelete = (req, res) => {
    const pId = req.params.pId
    ProductModel.deleteOne({ _id: pId }).then(result => {
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
//------------------Deleting The data----------------//