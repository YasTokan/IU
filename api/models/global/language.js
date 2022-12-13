const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
    {

        name: { type: String, require: true, unique: true },
        description: { type: String, default: null },
        shortCode: { type: String, default: null },
        media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', default: null }]

    }
)

module.exports = mongoose.model("Language", catSchema)