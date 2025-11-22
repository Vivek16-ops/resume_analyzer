import express from "express";
import { getProductPricing } from "../../controller/payment_controller/getproductPricing.controller.js";
import { setProductPricing } from "../../controller/payment_controller/setproductPricing.controller.js";

const router = express.Router();


router.post("/set", setProductPricing)
router.post("/get", getProductPricing)

export default router