import express from "express";
import { getRooms, createRooms, deleteRooms } from "../controllers/rooms.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRooms);
router.post("/", auth, createRooms);
router.delete("/:id", auth, deleteRooms);

export default router;
