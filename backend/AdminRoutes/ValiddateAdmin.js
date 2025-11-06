import express from "express";

import { ValidateAdminAPI } from "../AdminController/ValidateAdminAPI.controller.js"

const router = express.Router();

router.post("/", ValidateAdminAPI)

export default router