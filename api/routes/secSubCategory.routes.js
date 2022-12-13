const express = require('express');
const router = express.Router()




const auth = require("../auth/auth")

const secSubCatController = require('../controllers/secSubCat.controller')

/* auth, */

router.post("/new", secSubCatController.create)
router.patch("/edit/:id", secSubCatController.edit)
router.get("/list", secSubCatController.list)
router.get("/listByCat/:catId", secSubCatController.listByCat)
router.delete("/delete/:id", secSubCatController.deleteCat)


module.exports = router