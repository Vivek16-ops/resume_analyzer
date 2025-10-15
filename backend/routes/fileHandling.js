import express from "express";
import { fileHandlingFunc } from "../controller/fileHandling.controller.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/",upload.single('file'), fileHandlingFunc)

export default router

// upload.single('file') :- Multer middleware to parse the formData and then added to req.file