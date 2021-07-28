const ProductModel = require("../Model/AdminProductModel")
exports.getProductName = (req, res) => {
    res.render('Admin/addProduct')
}


exports.postProduct = (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const ProductImg = req.file
    const ProductPrice = req.body.ProductPrice
    const img_url = ProductImg.path
    console.log(ProductImg)

    const ProductDetails = new ProductModel(
        {
            title: title,
            description: description,
            ProductImg: img_url,
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
}


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





exports.getEditedProduct = (req, res) => {
    //To collect the product id form URL
    const pId = req.params.pId

    ProductModel.findById(pId).then(product => {
        console.log(product)
        return res.status(200).json({
            status: true,
            message: "Product Edited Data fetched successfully",
        })
    }).catch((err) => {
        console.log(err)
        return res.status(401).json({
            status: false,
            message: "Product Edit Unsuccessfully"
        })
    })
}


exports.postproductEdit = (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const ProductImg = req.body.ProductImg
    const ProductPrice = req.body.ProductPrice
    const pId = req.body.pId


    ProductModel.findById(pId).then(product => {
        if (product) {
            product.title = title
            product.description = description
            product.ProductImg = ProductImg
            product.ProductPrice = ProductPrice


            return product.save().then(data => {
                console.log("Product Updated Sucessfully", data)
                return res.status(200).json({
                    status: true,
                    message: "Post Product Edited Unsuccessfully"
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
}


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
            message: "Product Deleted Unsuccessfully"
        })
    })
}