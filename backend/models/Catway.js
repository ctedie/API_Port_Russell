/**
 * Catway model.
 *
 * @typedef {Object} Catway
 * @property {number} catwayNumber
 * @property {string} catwayType
 * @property {string} catwayState
 */

const mongoose = require("mongoose");

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    catwayType: {
      type: String,
      enum: ["long", "short"],
      required: true,
    },
    catwayState: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catway", catwaySchema);
