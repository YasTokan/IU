const express = require('express');
const router = express.Router()
 


 
const auth = require("../auth/auth")
 
const catController = require('../controllers/category.controller')

/* auth, */

router.post("/new", catController.create)
router.post("/addCover/:id", catController.upload.single("cover"),catController.addCover)
router.post("/removeCover/:id/:mediaid", catController.removeCover)
router.patch("/edit/:id", catController.edit)
router.get("/list", catController.list)
router.get("/:id", catController.getById)
router.delete("/delete/:id", catController.deleteCat)


module.exports = router