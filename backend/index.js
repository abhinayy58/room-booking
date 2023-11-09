const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path")
const bodyParser = require("body-parser");
const authRoute = require("./routes/Auth.js");
const userRoute = require("./routes/User.js");
const roomRoute = require("./routes/Room.js");
const bookingRoute = require("./routes/Booking.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8500;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.", mongoose.connection.host);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/booking", bookingRoute);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Connected to backend with port ${PORT}`);
});
