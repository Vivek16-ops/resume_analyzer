import User from '../models/users.model.js';
export const registerUserAPI = async (req, res) => {
    try {
        const { email, fullName } = await req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ success: false, message: "User already exists", isAdmin: existingUser.isAdmin });
        }

        const newUser = new User({ email, fullName });
        await newUser.save();

        return res.json({ success: true, message: "You have been registered successfully", isAdmin: newUser.isAdmin });
    } catch (error) {
        return res.json({ success: false, message: "Register User API failed", error_message: error.message })
    }
}