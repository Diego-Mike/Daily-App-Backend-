import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET);
      req.userId = decodedData?.id;
    } else {
      res.json({ message: "You are not registered" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default auth;
