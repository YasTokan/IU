const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
    {

        name: { type: String, require: true, unique: true },
        description: { type: String, default: null },
        icon: { type: String, default: null },
        order: { type: Number, default: null },
        active: { type: Boolean, default: true },
        media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', default: null }],
        Countries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country', default: null }],

    }
)

module.exports = mongoose.model("Category", catSchema)