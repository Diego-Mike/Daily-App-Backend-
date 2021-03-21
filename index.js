import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import rooms from "./routes/rooms.js";
import user from "./routes/user.js";
import tasks from "./routes/tasks.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

app.use("/rooms", rooms);
app.use("/tasks", tasks);
app.use("/user", user);
app.get("/", (req, res) => {
  res.send("Hello To Dailys Backend App");
});

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Daily-App"
});

mongoose.set("useFindAndModify", false);

app.listen(PORT, () => {
  console.log("Server Working Succesfully");
});
