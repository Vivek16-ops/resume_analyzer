import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
    monthly: {
        type: Number,
        required: true
    },
    yearly: {
        type: Number,
        required: true
    }
}, { _id: false });

const productSubscriptionDetailSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    basic: {
        type: pricingSchema,
        required: true
    },
    premium: {
        type: pricingSchema,
        required: true
    },
    enterprise: {
        type: pricingSchema,
        required: true
    }
});

const ProductSubscriptionDetail = mongoose.model(
    "ProductSubscriptionDetail",
    productSubscriptionDetailSchema
);

export default ProductSubscriptionDetail;