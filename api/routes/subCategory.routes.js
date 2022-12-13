const express = require('express');
const router = express.Router()
 


 
const auth = require("../auth/auth")
 
const subCatController = require('../controllers/subCategory.controller')

/* auth, */

router.post("/new", subCatController.create)
router.patch("/edit/:id", subCatController.edit)
router.get("/list", subCatController.list)
router.get("/byCatId/:id", subCatController.getByCatId)
router.get("/:id", subCatController.getById)
router.delete("/delete/:id", subCatController.deleteCat)

router.post("/addCover/:id", subCatController.upload.single("cover"),subCatController.addCover)
router.post("/removeCover/:id/:mediaid", subCatController.removeCover)


module.exports = router