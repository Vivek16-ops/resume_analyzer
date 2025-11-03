import express from "express";
import { getBlogsAPI } from "../controller/getBlogs.controller.js"

const router = express.Router();

router.post("/", getBlogsAPI)

export default router