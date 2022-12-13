
const express = require('express');
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



const catModel = require('../models/category')


/* Multer Config */

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
     limits: {
         fileSize: 1024 * 1024 * 5
     },
    fileFilter: fileFilter
});

/* Multer Config */