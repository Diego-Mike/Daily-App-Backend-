import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  name: String,
  creator: String,
  room: String,
  comment: String,
  dayOver: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  homework: []
});

export default mongoose.model("Tasks", taskSchema);
