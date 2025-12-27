import express from "express";

import { get_all_notes, specific_note, create_note, update_note, delete_note } 
from "../controllers/notesControllers.js"

const router = express.Router();


router.get("/", get_all_notes);

router.get("/:id", specific_note);

router.post("/", create_note);

router.put("/:id", update_note);

router.delete("/:id", delete_note);


export default router;
