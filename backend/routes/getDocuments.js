import express from "express";
import { GetDocuments } from "../controller/getDocuments.controller.js"

const router = express.Router();


router.post("/", GetDocuments)

export default router