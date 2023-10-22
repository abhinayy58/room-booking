const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomDetails: [{ number: [Number], available: Boolean }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
