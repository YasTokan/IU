const express = require('express');
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");



const filterItemModel = require('../models/filterItem')

async function create(req, res, next) {

    const { name, description, icon, order, filterId } = req.body
    /* console.log({ name, description,  icon, order }) */
    if (name && filterId) {

        const cat = await filterItemModel.findOne({ name: name })

        if (!cat) {
            const newCat = new filterItemModel({
                name: name,
                description: description,
                order: order,
                icon: icon,
                filterId: filterId
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

    if (req.params.id) {
        const { name, description, icon, order, filterId, } = req.body
        const rp = await filterItemModel.findOne({ _id: id })

        if (rp) {
            const product = await filterItemModel.findOneAndUpdate(
                { _id: id },
                {
                    $set:
                    {
                        name: name,
                        description: description,
                        order: order,
                        icon: icon,
                        filterId: filterId
                    }
                })
            const resProduct = await filterItemModel.find({ _id: id })
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
    if (req.params.id && req.params.id != null && req.params.id !=undefined && mongoose.isValidObjectId(_id) ) {
        filterItemModel.find({ filterId: _id }).populate("filterId").exec().then(
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
        filterItemModel.find({}).populate("filterId").exec().then(
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


async function customList(req, res, next) {
    const _id = req.params.id

    console.log("customListcustomListcustomListcustomListcustomListcustomListcustomListcustomListcustomListcustomListcustomListcustomList")
    console.log("customList")
    console.log("_id")
    console.log(_id)
    if (true) {
       /*  filterItemModel.aggregate([
            { $group : { _id : '$name', totaldocs : { $sum : 1 } } }
          ]).pretty() */
        filterItemModel.aggregate([{ $group: { _id: '$filterId' ,     name: '$name' }  }]).exec().then(
            (result) => {   
                console.log(result)
                res.status(200).json({
                    message: "found",
                    data: result
                })
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
        /*   filterItemModel.find({ _id: _id }).populate("filterId").exec().then(
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
          ) */
    } else {
        filterItemModel.find({}).populate("filterId").exec().then(
            (result) => {
                console.log(result)
                if (result.length >= 1) {
                    var res = result.slice()
                    var data = {}
                    res.forEach((r) => {
                        data.push({})
                    })
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
        const rp = await filterItemModel.findOne({ _id: id })
        if (rp) {
            const product = await filterItemModel.findOneAndDelete({ _id: id })
            const resProduct = await filterItemModel.find({ _id: id })
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
module.exports = { create, edit, list, deleteCat, customList };  
