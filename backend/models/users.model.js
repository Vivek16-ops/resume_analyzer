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
    }
})

const User = mongoose.model("User", userSchema);
export default User;