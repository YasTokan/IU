const express = require('express');
const router = express.Router()




const auth = require("../auth/auth")

const itemController = require('../controllers/item.Controller')

/* auth, */

router.post("/new", itemController.create)
router.patch("/edit/:id", itemController.edit)

router.get("/list/:id", itemController.list)
router.get("/list/", itemController.list)


/* router.get("/list/bySubCategory/", itemController.list) */
router.get("/list/byCategory/:categoryId", itemController.listByCategory)

router.get("/list/bySubCategory/:subCategoryId", itemController.listBySubCategory)
router.get("/list/byFilterItem/:filterItemId", itemController.listFilterItem)
router.delete("/delete/:id", itemController.deleteCat)



router.post("/addCover/:id", itemController.upload.single("cover"),itemController.addCover)
router.post("/removeCover/:id/:mediaid", itemController.removeCover)


module.exports = router