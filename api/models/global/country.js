const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
    {

        name: { type: String, require: true, unique: true },
        description: { type: String, default: null },
        shortCode: { type: String, default: null },
        order: { type: Number, default: null },
        active: { type: Boolean, default: true },
        media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', default: null }],
        languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language', default: null }],
        currencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Currency', default: null }],

    }
)

module.exports = mongoose.model("Country", catSchema)