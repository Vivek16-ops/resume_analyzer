import express from "express";
import { getRecentDetail } from "../controller/getRecentDetail.controller.js"

const router = express.Router();

router.post("/", getRecentDetail)

export default router