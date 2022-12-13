const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
    {

        name: { type: String, require: true  },
        description: { type: String, default: null },
        icon: { type: String, default: null },
        order: { type: Number, default: null },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
        secSubCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SecSubCategory' },
        active: { type: Boolean, default: true },
        media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', default : null }]

    }
)

module.exports = mongoose.model("Filter", catSchema)