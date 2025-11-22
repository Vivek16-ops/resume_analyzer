import mongoose from "mongoose";

const singleSubscriptionSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    subscriptionType: {
        type: String,
        enum: ["basic", "premium", "enterprise"],
        required: true
    },
    subscriptionPlan: {
        type: String,
        enum: ["monthly", "yearly"],
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { _id: false });

const userSubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,     
        required: true
    },

    subscriptions: {
        type: [singleSubscriptionSchema], 
        default: []
    }
});

const UserSubscription = mongoose.model(
    "UserSubscription",
    userSubscriptionSchema
);

export default UserSubscription;
