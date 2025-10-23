import express from "express";
import { contactFormAPI } from "../controller/contactForm.controller.js";

const router = express.Router();

router.post("/", contactFormAPI)

export default router