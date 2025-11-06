import express from "express";
import { registerUserAPI } from "../controller/registerUserAPI.controller.js"

const router = express.Router();

router.post("/", registerUserAPI)

export default router