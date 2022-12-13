const express = require('express');
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");



const itemModel = require('../models/item');
const item = require('../models/item');





/* Multer Config */
var fs = require('fs');
const mediaModel = require('../models/media')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/item');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getDate() + new Date().getMilliseconds() + file.originalname);
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
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


async function addCover(req, res, next) {

    const media = new mediaModel({
        name: req.body.name,
        uri: req.file.path
    });
    media.save()
    const id = req.params.id
    if (id) {
        const { name, description, icon, order } = req.body
        const rp = await itemModel.findOne({ _id: id })
        if (rp) {
            const resProduct = await itemModel.findOne({ _id: id })
            resProduct.media.push(media._id)
            const product = await itemModel.findByIdAndUpdate({ _id: id }, { $set: { media: resProduct.media } })
            product.save()
            res.status(200).json({
                message: "handeling patch productID request products route " + id,
                data: resProduct,
                error: false

            })
        } else {
            return res.status(400).json({
                message: "Category Not Found Try agin ",
                error: true
            })
        }

    } else {
        return res.status(400).json({
            message: "Please make sure you entered id of the category ",
            error: true

        })
    }
}


async function removeCover(req, res, next) {

    //console.log(req)
    /*  const media = new mediaModel({
         name: req.body.name,
         uri: req.file.path
     });
     media.save() */
    const id = req.params.id
    const mediaid = req.params.mediaid
    if (id && mediaid) {
        const { name, description, icon, order } = req.body
        const rp = await itemModel.findOne({ _id: id })
        const rm = await mediaModel.findOne({ _id: mediaid })
        if (rp && rm) {
            const resProduct = await itemModel.findOne({ _id: id })
            const index = resProduct.media.indexOf(mediaid);
            console.log("index")
            console.log(index)
            if (index > -1) { // only splice array when item is found
                resProduct.media.splice(index, 1); // 2nd parameter means remove one item only
            }
            // var filePath = 'c:/book/discovery.docx';
            fs.unlinkSync(rm.uri);
            const product = await itemModel.findByIdAndUpdate({ _id: id }, { $set: { media: resProduct.media } })
            product.save()
            res.status(200).json({
                message: "handeling patch productID request products route " + id,
                data: resProduct,
                error: false

            })
        } else {
            return res.status(400).json({
                message: "Category or Media Not Found Try agin ",
                error: true
            })
        }

    } else {
        return res.status(400).json({
            message: "Please make sure you entered id of the category ",
            error: true

        })
    }
}

/* Multer Config */







async function create(req, res, next) {

    const {
        name, description, icon, order, duration,
        filterItemId, information, price, avalibile,
        type, location, categoryId, subCategoryId, secSubCategoryId,
        additional } = req.body
    /* console.log({ name, description,  icon, order }) */
    if (name) {




        const newItem = new itemModel({
            name: name,
            description: description,
            order: order,
            icon: icon,
            filterItemId: filterItemId,
            information: information,
            price: price,
            duration: duration,
            avalibile: avalibile,
            type: type,
            location: location,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            additional: additional,
            secSubCategoryId: secSubCategoryId,
            createdAt: new Date()
        })

        /* .toLocaleString('en', { dateStyle: 'short' }) */

        const resp = await newItem.save()
        console.log("resp")
        console.log(resp)
        if (resp) {
            return res.status(200).json({
                message: "sub item created successfully",
                data: resp,
                error: false
            })
        } else {
            return res.status(200).json({
                message: "sub cat Not created  ",
                data: resp,
                error: true
            })
        }





    } else {
        return res.status(400).json({
            message: "Please make sure you entered  Name & category id of the category "
        })
    }
}

async function edit(req, res, next) {


    const id = req.params.id

    if (id) {
        const {
            name, description, icon, order, duration,
            filterItemId, information, price, avalibile,
            type, location, categoryId, subCategoryId, secSubCategoryId,
            additional } = req.body
        const rp = await itemModel.findOne({ _id: id })

        if (rp) {
            const product = await itemModel.findOneAndUpdate(
                { _id: id },
                {
                    $set:
                    {
                        name: name,
                        description: description,
                        order: order,
                        icon: icon,
                        duration: duration,
                        filterItemId: filterItemId,
                        information: information,
                        price: price,
                        avalibile: avalibile,
                        type: type,
                        location: location,
                        categoryId: categoryId,
                        subCategoryId: subCategoryId,
                        secSubCategoryId: secSubCategoryId,
                        additional: additional

                    }
                })
            const resProduct = await itemModel.find({ _id: id })
            res.status(200).json({
                message: "handeling patch productID request products route " + id,
                data: resProduct,
                error: false

            })
        } else {
            return res.status(400).json({
                message: "Category Not Found Try agin ",
                error: true
            })
        }

    } else {
        return res.status(400).json({
            message: "Please make sure you entered id of the category ",
            error: true

        })
    }


}

async function list(req, res, next) {
    const _id = req.params.id

    console.log("_id")
    console.log(_id)
    if (req.params.id && req.params.id != null && req.params.id != undefined && mongoose.isValidObjectId(_id)) {
        itemModel.find({ _id: _id }).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
            (result) => {
                console.log(result)
                if (result.length >= 1) {
                    res.status(200).json({
                        message: "found",
                        data: result
                    })
                } else {
                    res.status(404).json({
                        message: "Not found",
                        data: result
                    })
                }

            }
        ).catch(
            (err) => {
                console.log(err)
                res.status(404).json({
                    message: "Not found",
                    data: err
                })
            }
        )
    } else {
        itemModel.find({}).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
            (result) => {
                console.log(result)
                if (result.length >= 1) {
                    res.status(200).json({
                        message: "found",
                        data: result
                    })
                } else {
                    res.status(404).json({
                        message: "Not found",
                        data: result
                    })
                }

            }
        ).catch(
            (err) => {
                console.log(err)
                res.status(404).json({
                    message: "Not found",
                    data: err
                })
            }
        )
    }

}


async function listByCategory(req, res, next) {
    const categoryId = req.params.categoryId

    console.log("categoryId")
    console.log(categoryId)
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
        itemModel.find({ categoryId: categoryId }).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
            (result) => {
                console.log(result)
                if (result.length >= 1) {
                    res.status(200).json({
                        message: "found",
                        data: result
                    })
                } else {
                    res.status(404).json({
                        message: "Not found",
                        data: result
                    })
                }

            }
        ).catch(
            (err) => {
                console.log(err)
                res.status(404).json({
                    message: "Not found",
                    data: err
                })
            }
        )
    } else {
        itemModel.find({}).exec().then(
            (result) => {
                console.log(result)
                if (result.length >= 1) {
                    res.status(200).json({
                        message: "found",
                        data: result
                    })
                } else {
                    res.status(404).json({
                        message: "Not found",
                        data: result
                    })
                }

            }
        ).catch(
            (err) => {
                console.log(err)
                res.status(404).json({
                    message: "Not found",
                    data: err
                })
            }
        )
    }

}
async function listBySubCategory(req, res, next) {
    const subCategoryId = req.params.subCategoryId

    console.log("subCategoryId")
    console.log(subCategoryId)
    console.log("subCategoryId")

    if (subCategoryId && mongoose.Types.ObjectId.isValid(subCategoryId)) {
        try {
            itemModel.find({ subCategoryId: subCategoryId }).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
                (result) => {
                    console.log(result)
                    if (result.length >= 1) {
                        res.status(200).json({
                            message: "found",
                            data: result
                        })
                    } else {
                        res.status(404).json({
                            message: "Not found",
                            data: result
                        })
                    }

                }
            ).catch(
                (err) => {
                    console.log(err)
                    res.status(404).json({
                        message: "Not found",
                        data: err
                    })
                }
            )
        } catch (err) {
            res.status(404).json({
                message: "Error ",
                data: [],
                error: trie
            })
        }

    } else {
        itemModel.find({}).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
            (result) => {
                console.log(result)
                if (result.length >= 1) {
                    res.status(200).json({
                        message: "found",
                        data: result
                    })
                } else {
                    res.status(404).json({
                        message: "Not found",
                        data: result
                    })
                }

            }
        ).catch(
            (err) => {
                console.log(err)
                res.status(404).json({
                    message: "Not found",
                    data: err
                })
            }
        )
    }

}


async function listFilterItem(req, res, next) {
    const filterItemId = req.params.filterItemId


    if (filterItemId && mongoose.Types.ObjectId.isValid(filterItemId)) {
        try {
            const items = []
            itemModel.find({}).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
                (result) => {
                    console.log(result)
                    if (result.length >= 1) {
                        result.forEach(
                            (r) => {
                                r.filterItemId.forEach(
                                    (rii) => {
                                        if (rii == filterItemId) {
                                            items.push(r)
                                        }
                                    }
                                )
                            }
                        )
                        res.status(200).json({
                            message: "found",
                            data: items,
                            count: items.length
                        })
                    } else {
                        res.status(404).json({
                            message: "Not found",
                            data: result
                        })
                    }

                }
            ).catch(
                (err) => {
                    console.log(err)
                    res.status(404).json({
                        message: "Not found",
                        data: err
                    })
                }
            )
        } catch (err) {
            res.status(404).json({
                message: "Error ",
                data: [],
                error: trie
            })
        }

    } else {
        itemModel.find({}).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
            (result) => {
                console.log(result)
                if (result.length >= 1) {
                    res.status(200).json({
                        message: "found",
                        data: result
                    })
                } else {
                    res.status(404).json({
                        message: "Not found",
                        data: result
                    })
                }

            }
        ).catch(
            (err) => {
                console.log(err)
                res.status(404).json({
                    message: "Not found",
                    data: err
                })
            }
        )
    }

}

async function deleteCat(req, res, next) {


    const id = req.params.id
    if (id) {
        const { name, description, icon, order } = req.body
        const rp = await itemModel.findOne({ _id: id })
        if (rp) {
            const product = await itemModel.findOneAndDelete({ _id: id })
            const resProduct = await itemModel.find({ _id: id })
            res.status(200).json({
                message: "handeling delete id request products route " + id,
                data: product,
                error: false

            })
        } else {
            return res.status(400).json({
                message: "Category Not Found Try agin ",
                error: true
            })
        }

    } else {
        return res.status(400).json({
            message: "Please make sure you entered id of the category ",
            error: true

        })
    }

}
module.exports = { create, edit, list, deleteCat, listByCategory, listBySubCategory, listFilterItem, removeCover, addCover, upload };  
