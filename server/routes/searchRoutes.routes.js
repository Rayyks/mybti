import express from "express";
import { searchUsers } from "../controllers/SEARCHCONTROLLER/search.controller.js";

const router = express.Router();

router.get("/users", searchUsers);

export default router;
