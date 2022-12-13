const express = require('express');
const router = express.Router()

const orderModel = require('../models/order')
const productsModel = require('../models/product')

const auth = require("../auth/auth")
router.post("/", auth, async (req, res, next) => {
    const { productId, quantity } = req.body
    if (productId && quantity) {
        try {
            const product = await productsModel.findById({ productId })
            if (product) {
                const order = new orderModel({ productId: productId, quantity: quantity })
                if (order) {
                    res.status(200).json({
                        message: "handeling post request order route",
                        data: order,
                        error: false
                    })
                } else {
                    res.status(500).json({
                        message: "Error handeling post request order route",
                        data: order,
                        error: true
                    })
                }
            } else {
                res.status(404).json({
                    message: "Error handeling post request order route",
                    data: "Product does not exists ",
                    error: true
                })
            }
        } catch (erro) {
            res.status(404).json({
                message: "Error handeling post request order route",
                data: "Product does not exists ",
                error: true
            })
        }


        /*  order.save().then(
             (res) => {
                 res.status(200).json({
                     message: "handeling post request order route",
                     data: order,
                     error: false
                 })
             }
         ).catch(
             (err) => {
                 res.status(500).json({
                     message: "Error handeling post request order route",
                     data: err,
                     error: true
                 })
             }
         ) */
    } else {
        res.status(200).json({
            message: "please provide at least one product id & quatity",

        })
    }

})

router.get("/", async (req, res, next) => {
    const orders = await orderModel.find().populate('productId')
    console.log(orders)
    res.status(200).json({
        message: "handeling get request order route",
        /*    count: orders.length, */
        data: orders
    })
})

router.get("/:orderID", (req, res, next) => {

    const id = req.params.orderID
    res.status(200).json({
        message: "handeling get orderID request order route " + id
    })
})

router.patch("/:orderID", (req, res, next) => {

    const id = req.params.orderID
    res.status(200).json({
        message: "handeling patch orderID request order route " + id
    })
})

router.delete("/:orderID", (req, res, next) => {

    const id = req.params.orderID
    res.status(200).json({
        message: "handeling delete orderID request products route " + id
    })
})


module.exports = router