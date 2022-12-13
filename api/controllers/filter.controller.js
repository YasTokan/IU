const express = require('express');
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



const filterModel = require('../models/filer')

async function create(req, res, next) {

    const { name, description, icon, order, categoryId, subCategoryId, active, secSubCategoryId } = req.body
    /* console.log({ name, description,  icon, order }) */
    if (name && categoryId) {

        /*  const cat = await filterModel.findOne({ name: name }) */


        const newCat = new filterModel({
            name: name,
            description: description,
            order: order,
            icon: icon,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            secSubCategoryId: secSubCategoryId,
            active: active
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
            message: "Please make sure you entered FullName & category id of the category "
        })
    }
}

async function edit(req, res, next) {


    const id = req.params.id

    if (id) {
        const { name, description, icon, order, categoryId, subCategoryId, active, secSubCategoryId } = req.body
        const rp = await filterModel.findOne({ _id: id })

        if (rp) {
            const product = await filterModel.findOneAndUpdate(
                { _id: id },
                {
                    $set:
                    {
                        name: name,
                        description: description,
                        order: order,
                        icon: icon,
                        categoryId: categoryId,
                        subCategoryId: subCategoryId,
                        secSubCategoryId: secSubCategoryId,
                        active: active
                    }
                })
            const resProduct = await filterModel.find({ _id: id })
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

    filterModel.find({}).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
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

async function listByCat(req, res, next) {

    const id = req.params.catId
    filterModel.find({ categoryId: id }).populate("subCategoryId secSubCategoryId categoryId media").exec().then(
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
        const rp = await filterModel.findOne({ _id: id })
        if (rp) {
            const product = await filterModel.findOneAndDelete({ _id: id })
            const resProduct = await filterModel.find({ _id: id })
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
module.exports = { create, edit, list, deleteCat, listByCat };  
