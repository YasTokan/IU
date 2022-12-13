const express = require('express');
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");



const CurrenyModel = require('../../models/global/currency')

async function create(req, res, next) {

    const { name, description, shortCode } = req.body
    /* console.log({ name, description,  shortCode, order }) */
    if (name) {

        const cat = await CurrenyModel.findOne({ name: name })

        if (!cat) {
            const newCat = new CurrenyModel({
                name: name,
                description: description,
                
                shortCode: shortCode
            })

            const resp = await newCat.save()
            console.log("resp")
            console.log(resp)
            if (resp) {
                return res.status(200).json({
                    message: "Currency created successfully",
                    data: resp,
                    error: false
                })
            } else {
                return res.status(200).json({
                    message: "Currency Not created  ",
                    data: resp,
                    error: true
                })
            }
        } else {
            return res.status(400).json({
                message: "Currency Name exists try again another one ",
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
        const { name, description, shortCode, order, } = req.body
        const rp = await CurrenyModel.findOne({ _id: id })

        if (rp) {
            const product = await CurrenyModel.findOneAndUpdate(
                { _id: id },
                {
                    $set:
                    {
                        name: name,
                        description: description,
                        
                        shortCode: shortCode
                    }
                })
            const resProduct = await CurrenyModel.find({ _id: id })
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

    CurrenyModel.find({}).populate("media").exec().then(
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


async function customList(req, res, next) {
    const _id = req.params.id

    
    console.log(_id)
    if (true) {
        /*  CurrenyModel.aggregate([
             { $group : { _id : '$name', totaldocs : { $sum : 1 } } }
           ]).pretty() */
        CurrenyModel.aggregate([{ $group: { _id: '$filterId', name: '$name' } }]).exec().then(
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
        /*   CurrenyModel.find({ _id: _id }).populate("filterId").exec().then(
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
        CurrenyModel.find({}).populate("filterId").exec().then(
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

async function delet(req, res, next) {


    const id = req.params.id
    if (id) {
        const { name, description, shortCode, order } = req.body
        const rp = await CurrenyModel.findOne({ _id: id })
        if (rp) {
            const product = await CurrenyModel.findOneAndDelete({ _id: id })
            const resProduct = await CurrenyModel.find({ _id: id })
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
module.exports = { create, edit, list, delet };  
