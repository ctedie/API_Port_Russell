const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    boatName: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Validation simple : endDate > startDate
reservationSchema.pre("save", function () {
  if (this.endDate <= this.startDate) {
    throw new Error("endDate must be after startDate");
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);
