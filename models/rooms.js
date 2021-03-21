import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  name: String,
  creator: String,
  room: String,
  createdAt: { type: Date, default: new Date() }
});

const Rooms = mongoose.model("Rooms", roomSchema);

export default Rooms;
