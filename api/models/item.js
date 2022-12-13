const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
    {

        name: { type: String, require: true },
        description: { type: String, default: null },
        information: { type: String, default: null },
        type: { type: String, default: null },
        avalibile: { type: String, default: null },
        price: { type: String, default: null },
        location: { type: String, default: null },
        icon: { type: String, default: null },
        order: { type: Number, default: null },

        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

        filterItemId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FilterItem' }],
        subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },

        secSubCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SecSubCategory' },
        createdAt: { type: String, default: null },
        duration: { type: String, default: null },
        additional: [
            {
                label: { type: String, default: null },
                value: { type: String, default: null },
                icon: { type: String, default: null },
            }
        ],



        media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', default: null }]

    }, { timestamps: true }
)

catSchema.index({ createdAt: 1, type: "Ad" }, { expireAfterSeconds: 10 })
module.exports = mongoose.model("Item", catSchema)