import mongoose from "mongoose";
import modelRoom from "../models/rooms.js";

export const getRooms = async (req, res) => {
  try {
    const rooms = await modelRoom.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: "The Server Crashed And Gave Error" });
    console.log(error);
  }
};

export const createRooms = async (req, res) => {
  const room = req.body;

  const newRoom = new modelRoom({
    ...room,
    createdAt: new Date().toISOString(),
    creator: req.userId
  });

  try {
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(409).json({ message: "There was an error creating your room" });
    console.log(error);
  }
};

export const deleteRooms = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `Theres no post with that id of ${id}` });

  await modelRoom.findByIdAndRemove(id);

  res.json(`Post with id of ${id} was deleted`);
};
