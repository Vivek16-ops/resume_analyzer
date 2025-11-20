import express from "express";
import { getRecentDetail } from "../../controller/resume_analysis_controller/getRecentDetail.controller.js"

const router = express.Router();

router.post("/", getRecentDetail)

export default router