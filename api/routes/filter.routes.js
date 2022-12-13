const express = require('express');
const router = express.Router()
 


 
const auth = require("../auth/auth")
 
const filterController = require('../controllers/filter.controller')

/* auth, */

router.post("/new", filterController.create)
router.patch("/edit/:id", filterController.edit)
router.get("/list", filterController.list)
router.get("/listByCat/:catId", filterController.listByCat)
router.delete("/delete/:id", filterController.deleteCat)


module.exports = router