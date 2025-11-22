import express from "express";
import {set_user_subscription} from "../../controller/payment_controller/set_user_subscription.controller.js"
import {get_user_subscription} from "../../controller/payment_controller/get_user_subscription.controller.js"

const router = express.Router();


router.post("/set", set_user_subscription)
router.post("/get", get_user_subscription)


export default router