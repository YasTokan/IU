const express = require('express');
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const orderModel = require('../models/order')
const userModel = require('../models/user')

async function signup(req, res, next) {
    console.log("signup")
    console.log("Here")
    const { email, password, passwordCon, fullName, role, active } = req.body
    console.log({ email, password, passwordCon, fullName, role })
    if (email && password && passwordCon && fullName ) {

        if (password == passwordCon) {
            encryptedPassword = await bcrypt.hash(password, 10);
            if (encryptedPassword) {
                console.log({ email, password, passwordCon, fullName, role, active })

                userModel.find({ "email": email }).exec().then(
                    (async result => {
                        if (result) {
                            console.log("result")
                            console.log(result)
                            if (result.length >= 1) {
                                return res.status(422).json({
                                    message: "Email Exists "
                                })

                            } else {


                                if (false) {
                                    return res.status(500).json({
                                        message: "No permsion"
                                    })
                                } else {
                                    const user = new userModel({
                                        role: role,
                                        fullName: fullName,
                                        email: email,
                                        password: encryptedPassword,
                                        active: active
                                    })
                                    await user.save().catch(
                                        (err) => {
                                            return res.status(500).json({
                                                message: "User is not created please try again",
                                                error: true
                                            })
                                        }
                                    )
                                    if (user) {
                                        return res.status(200).json({
                                            message: "User is created proceed to log in",
                                            error: false,
                                            data: user
                                        })
                                    } else {
                                        return res.status(500).json({
                                            message: "User is not created please try again",
                                            error: true
                                        })
                                    }
                                }
                            }
                        }
                    })
                ).catch(err => {
                    console.log(err)
                })



            } else {
                return res.status(500).json({
                    message: "Error happend please try again later"
                })
            }
        } else {
            return res.status(400).json({
                message: "Please make sure Password & PasswordCon are equials"
            })
        }
    } else {
        return res.status(400).json({
            message: "Please make sure you entered all the fields Email, Passwrod, PasswordCon, FullName & Role"
        })
    }
}

async function login(req, res, next) {
    const { email, password } = req.body

    userModel.find({ email: email }).exec().then(
        (result) => {

            if (result.length >= 1) {
                bcrypt.compare(password, result[0].password, (err, success) => {
                    if (err) {
                        res.status(500).json({
                            message: "Internal Error",
                            data: err
                        })
                    } else {

                        if (success) {

                            const user = result
                            const token = jwt.sign(
                                { user_id: user._id, email },
                                'SECERET',
                                {
                                    expiresIn: "2h",
                                }
                            );

                            // save user token
                            user.token = token;

                            res.status(200).json({
                                message: "Success",
                                data: user,
                                token: token
                            })
                        } else {
                            res.status(404).json({
                                message: "Fail",
                                data: result
                            })
                        }
                    }
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

async function list(req, res, next) {

    userModel.find({}).exec().then(
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

async function deleteUser(req, res, next) {
    console.log("req.body.fullName")
    console.log(req.params.id)



    userModel.findOneAndDelete({ _id: req.params.id }).exec().then(
        (resss) => {

            return res.status(200).json({
                message: "deleted",
                data: resss
            })
        }
    ).catch(err => {
        return res.status(500).json({
            message: "Error",
            data: err
        })
    })
}
module.exports = { signup, login, list, deleteUser };  
