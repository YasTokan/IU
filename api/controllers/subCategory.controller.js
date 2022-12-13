const express = require('express');
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



const subCatModel = require('../models/subCategory')
const mediaModel = require('../models/media')




/* Multer Config */
var fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/subCategory');
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
        const rp = await subCatModel.findOne({ _id: id })
        if (rp) {
            const resProduct = await subCatModel.findOne({ _id: id })
            resProduct.media.push(media._id)
            const product = await subCatModel.findByIdAndUpdate({ _id: id }, { $set: { media: resProduct.media } })
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
        const rp = await subCatModel.findOne({ _id: id })
        const rm = await mediaModel.findOne({ _id: mediaid })
        if (rp && rm) {
            const resProduct = await subCatModel.findOne({ _id: id })
            const index = resProduct.media.indexOf(mediaid);
            console.log("index")
            console.log(index)
            if (index > -1) { // only splice array when item is found
                resProduct.media.splice(index, 1); // 2nd parameter means remove one item only
            }
            // var filePath = 'c:/book/discovery.docx';
            fs.unlinkSync(rm.uri);
            const product = await subCatModel.findByIdAndUpdate({ _id: id }, { $set: { media: resProduct.media } })
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

    const { name, description, icon, order, categoryId, active } = req.body
    /* console.log({ name, description,  icon, order }) */
    if (name && categoryId) {

        const cat = await subCatModel.findOne({ name: name })

        if (true) {
            const newCat = new subCatModel({
                name: name,
                description: description,
                order: order,
                icon: icon,
                active: active,
                categoryId: categoryId
            })

            const resp = await newCat.save()
            console.log("resp")
            console.log(resp)
            if (resp) {
                return res.status(200).json({
                    message: "sub cat created successfully",
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
                message: "sub Cat Name exists try again another one ",
                data: cat,
                error: true

            })
        }




    } else {
        return res.status(400).json({
            message: "Please make sure you entered FullName & category id of the category "
        })
    }
}

async function edit(req, res, next) {


    const id = req.params.id

    if (id) {
        const { name, description, icon, order, categoryId, active } = req.body
        const rp = await subCatModel.findOne({ _id: id })
        console.log("rp")
        console.log(rp)
        if (rp) {
            const product = await subCatModel.findOneAndUpdate({ _id: id },
                { $set: { name: name, description: description, order: order, icon: icon, active: active, categoryId: categoryId } })
            const resProduct = await subCatModel.find({ _id: id })
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

    subCatModel.find({}).populate("media categoryId").exec().then(
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

async function getById(req, res, next) {

    const id = req.params.id
    subCatModel.find({ _id: id }).populate("media").exec().then(
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

async function getByCatId(req, res, next) {

    const id = req.params.id
    console.log("req.params.id")
    console.log(req.params.id)
    subCatModel.find({ categoryId: id }).populate("media").exec().then(
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

async function deleteCat(req, res, next) {


    const id = req.params.id
    if (id) {
        const { name, description, icon, order } = req.body
        const rp = await subCatModel.findOne({ _id: id })
        if (rp) {
            const product = await subCatModel.findOneAndDelete({ _id: id })
            const resProduct = await subCatModel.find({ _id: id })
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
module.exports = { create, edit, list, deleteCat, addCover, removeCover, upload, getById, getByCatId };  
