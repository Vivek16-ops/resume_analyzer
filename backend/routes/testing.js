import express from "express";
import { testingAPI } from "../controller/testing.controller.js"

const router = express.Router();


router.post("/check", testingAPI)

export default router