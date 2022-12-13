const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
    {

        name: { type: String, require: true },
        description: { type: String, default: null },
        icon: { type: String, default: null },
        active: { type: Boolean, default: true },
        order: { type: Number, default: null },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', default: null }]

    }
)

module.exports = mongoose.model("SubCategory", catSchema)