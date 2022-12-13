const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
    {

        name: { type: String, require: true },
        description: { type: String, default: null },
        icon: { type: String, default: null },
        order: { type: Number, default: null },
        filterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Filter' },
        media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', default : null }]

    }
)

module.exports = mongoose.model("FilterItem", catSchema)