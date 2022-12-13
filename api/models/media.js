const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {

        name: { type: String, default: null },
        uri: { type: String, default: null },


    }
)

module.exports = mongoose.model("Media", productSchema)