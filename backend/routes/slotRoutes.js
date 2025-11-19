import express from "express";
import { getSlots, saveSlots } from "../controllers/slotController.js";

const router = express.Router();

// GET /api/slots
router.get("/", getSlots);

// POST /api/slots
router.post("/", saveSlots);

export default router;
