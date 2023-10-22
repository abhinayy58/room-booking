const Booking = require("../models/Booking.js");
const Room = require("../models/Rooms.js");

const createBooking = async (req, res, next) => {
  const roomId = req.params.roomid;
  const newRoom = new Booking(req.body);
  newRoom.userID = req.user.id;
  try {
    const savedRoom = await newRoom.save();
    const roomNumber = req.body.roomDetails[0].number;
    try {
      await Room.findByIdAndUpdate(
        roomId,
        {
          $set: {
            "availableRooms.$[elem].available": false,
          },
        },
        {
          arrayFilters: [{ "elem.number": { $in: roomNumber } }],
          new: true,
        }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const updatedRoom = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
const getBooking = async (req, res, next) => {
  try {
    const room = await Booking.find({userID:req.params.id});
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
const getBookings = async (req, res, next) => {
  try {
    const rooms = await Booking.find();
    res.status(200).json(rooms);

  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getBooking,
  getBookings,
};
