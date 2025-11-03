import express from "express";
import { blogUploadAPIController } from "../controller/blogUpload.controller.js"
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();


router.post("/", upload.single("media"), blogUploadAPIController)

export default router