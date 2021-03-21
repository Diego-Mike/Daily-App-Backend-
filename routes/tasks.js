import express from "express";
import auth from "../middleware/auth.js";
import {
  getAllTasks,
  createTasks,
  deleteTasks,
  checkTasks,
  dayOver,
  dayComment
} from "../controllers/tasks.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", auth, createTasks);
router.delete("/:id", auth, deleteTasks);
router.patch("/check/:id", auth, checkTasks);
router.patch("/dayover/:id", auth, dayOver);
router.patch('/comment/:id', auth, dayComment)

export default router;
