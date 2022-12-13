const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {

        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: null },
    }
)

module.exports = mongoose.model("Order", orderSchema)