const express = require('express');
const { default: mongoose } = require('mongoose');
const productModel = require('../models/product');
const mediaModel = require('../models/media');
const router = express.Router()

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    /*  limits: {
         fileSize: 1024 * 1024 * 5
     }, */
    fileFilter: fileFilter
});


router.post("/addCover/:productId", upload.single('productImage'), (req, res, next) => {
    console.log("req")
    console.log(req.params.productId)
    //console.log(req)
    const media = new mediaModel({
        name: req.body.name,
        uri: req.file.path
    });
    media.save()
    const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        media: media._id
    });
    product.save()
    if (product) {
        res.status(200).json({
            message: "success",
            erro: "false",
            data: product,
            media : media
        })
    } else {
        res.status(500).json({
            message: "fail",
            erro: "true",
            data: product
        })
    }
})
   
router.post("/", upload.single('productImage'), (req, res, next) => {
    console.log("req")
    console.log(req)
    const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/3", async (req, res, next) => {
    const product = new productModel(
        {
            name: req.body.name,
            price: req.body.price
        }
    )

    product.save().then(
        (result) => {
            console.log(result)
            res.status(200).json({
                "error": false,
                "data": product
            })

        }
    ).catch(
        (err) => {
            console.log(err)
            res.status(500).json(
                {
                    "error": true,
                    "data": err
                }
            )
        }
    )

})
router.get("/", (req, res, next) => {
    console.log("here")
    productModel.find()
        .select("name price _id productImage")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    };
                })
            };
            //   if (docs.length >= 0) {
            res.status(200).json(response);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.get("/2", async (req, res, next) => {





    try {
        // Get user input


        const products = await productModel.find({}).select('_id  name price')
        console.log("products")
        console.log(products)
        if (products) {
            res.status(200).json({
                message: "handeling get request products route",
                count: products.length,
                data: products.map(
                    (r) => {
                        return {
                            name: r.name,
                            price: r.price,
                            _id: r._id,
                            link: {
                                method: 'Get Post Patch'
                            }
                        }
                    }
                )
            })
        } else {
            return res.status(402).send("no categories found !");

        }

    } catch (err) {
        console.log(err);
    }


})

router.get("/:productID", async (req, res, next) => {

    const id = req.params.productID
    if (id) {
        try {
            // Get user input


            const products = await productModel.findById(id)

            if (products) {
                res.status(200).json({
                    message: "handeling get request products route",
                    data: products
                })
            } else {
                res.status(402).send("no categories found !");

            }

        } catch (err) {
            console.log(err);
        }

    }
    /*   res.status(200).json({
          message: "handeling get productID request products route " + id
      }) */
})

router.patch("/:productID", async (req, res, next) => {

    const id = req.params.productID
    const { name, price } = req.body
    const product = await productModel.findByIdAndUpdate({ _id: id }, { $set: { name: name, price: price } })
    const resProduct = await productModel.find({ _id: id })
    res.status(200).json({
        message: "handeling patch productID request products route " + id,
        data: resProduct
    })
})

router.delete("/:productID", async (req, res, next) => {

    const id = req.params.productID
    if (id) {
        try {
            // Get user input


            const products = await productModel.deleteMany({ _id: id })

            if (products) {
                res.status(200).json({
                    message: "handeling get request products route",
                    data: products
                })
            } else {
                res.status(402).send("no categories found !");

            }

        } catch (err) {
            console.log(err);
        }

    }
})


module.exports = router