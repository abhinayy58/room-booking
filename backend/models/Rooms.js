const mongoose = require("mongoose");
const RoomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    default:
      "https://plus.unsplash.com/premium_photo-1680157071241-034d017884ca?auto=format&fit=crop&q=80&w=2857&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  availableRooms: [{number:Number,floor:Number,available:Boolean}],
},{
  timestamps:true
});

module.exports = mongoose.model("Room", RoomsSchema);
