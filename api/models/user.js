const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {

        email: { type: String, require: true },
        fullName: { type: String, require: true, unique: true },
        role: { type: Number, require: true, default: 2 },
        password: { type: String, require: true },
        active: { type: Boolean, require: true, default: true }
    }
)

module.exports = mongoose.model("Users", orderSchema)