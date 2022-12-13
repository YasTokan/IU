const express = require('express');
const router = express.Router()




const auth = require("../../auth/auth")

const currencyController = require('../../controllers/global/currency.controller')

/* auth, */

router.post("/new", currencyController.create)/* 
router.post("/addCover/:id", currencyController.upload.single("cover"), currencyController.addCover)
router.post("/removeCover/:id/:mediaid", currencyController.removeCover) */
router.patch("/edit/:id", currencyController.edit)
router.get("/list", currencyController.list)/* 
router.get("/:id", currencyController.getById) */
router.delete("/delete/:id", currencyController.delet)


module.exports = router