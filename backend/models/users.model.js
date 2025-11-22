import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, documents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Documents",
            default: []
        }
    ], isAdmin: {
        type: Boolean,
        default: false
    },isPremium: {
        type: Boolean,
        default: false
    },totalRequests: { // For tracking number of requests made by user for AI products
        type: Number,
        default: 0
    },subscriptions :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSubscription",
        default: []
    }]
})

const User = mongoose.model("User", userSchema);
export default User;