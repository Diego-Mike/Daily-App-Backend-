import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import userModel from "../models/user.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExist = await userModel.findOne({ email });

    if (userExist)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "There was an error in te API" });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await userModel.findOne({ email });

    if (!userExist) return res.status(404).json({ message: "Invalid Data" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Data" });

    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: userExist, token });
  } catch (error) {
    res.status(500).json({ message: "There was an error in te API" });

    console.log(error);
  }
};
