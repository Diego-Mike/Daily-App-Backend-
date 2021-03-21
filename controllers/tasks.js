import mongoose from "mongoose";
import dotenv from "dotenv";
import tasksModel from "../models/tasks.js";

dotenv.config();

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await tasksModel.find();

    res.status(200).json(allTasks);
  } catch (error) {
    res.status(404).json({ message: "There was an error in the server" });
    console.log(error);
  }
};

export const createTasks = async (req, res) => {
  const { name, room, homework, dayOver, comment } = req.body;

  const newTask = new tasksModel({
    creator: req.userId,
    createdAt: new Date().toISOString(),
    name,
    room,
    homework,
    dayOver,
    comment
  });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: "There was an error creating your task" });
    console.log(error);
  }
};

export const deleteTasks = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `Task with id of ${id} it is not valid` });

  await tasksModel.findByIdAndDelete(id);

  res.json({ message: `Task of id ${id} was deleted succesfully` });
};

export const checkTasks = async (req, res) => {
  const { id } = req.params;

  const specificHomework = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `Task with id of ${id} it is not valid` });

  const checkTask = await tasksModel.findById(id);

  const change = checkTask.homework;

  change.map(check =>
    check.todo === specificHomework.todo
      ? (check.complete = !check.complete)
      : check
  );

  const updatedCheck = await tasksModel.findByIdAndUpdate(id, checkTask, {
    new: true
  });

  res.status(200).json(updatedCheck);
};

export const dayOver = async (req, res) => {
  const { id } = req.params;

  const { room, name, creator, homework, createdAt, dayOver } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `Task with id of ${id} it is not valid` });

  const changeDay = {
    _id: id,
    room,
    name,
    creator,
    homework,
    createdAt,
    dayOver: !dayOver
  };

  const updatedDay = await tasksModel.findByIdAndUpdate(id, changeDay, {
    new: true
  });

  res.status(200).json(updatedDay);
};

export const dayComment = async (req, res) => {
  const { id } = req.params;

  const { commentFuck } = req.body;

  console.log(commentFuck);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `Task with id of ${id} it is not valid` });

  const findHomework = await tasksModel.findById(id);

  const updatedHijueputa = {
    _id: id,
    room: findHomework.room,
    name: findHomework.name,
    creator: findHomework.creator,
    homework: findHomework.homework,
    createdAt: findHomework.createdAt,
    dayOver: findHomework.dayOver,
    comment: commentFuck
  };

  const updatedComment = await tasksModel.findByIdAndUpdate(
    id,
    updatedHijueputa,
    {
      new: true
    }
  );

  res.status(200).json(updatedComment);
};
