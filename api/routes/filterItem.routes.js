const express = require('express');
const router = express.Router()




const auth = require("../auth/auth")

const filterItemController = require('../controllers/filterItem.controller')

/* auth, */

router.post("/new", filterItemController.create)
router.patch("/edit/:id", filterItemController.edit)
router.get("/list/", filterItemController.list)
router.get("/list/:id", filterItemController.list)

router.delete("/delete/:id", filterItemController.deleteCat)


module.exports = router