const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {

        name: { type: String, default: null },
        productImage: { type: String, default: null },
        price: { type: Number, default: null },
        media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },


    }
)

module.exports = mongoose.model("Product", productSchema)