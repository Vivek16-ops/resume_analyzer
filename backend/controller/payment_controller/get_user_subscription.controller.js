import UserSubscription from "../../models/user_subscription.model.js";

export const get_user_subscription = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const subscriptionData = await UserSubscription.findOne({ email });

        if (!subscriptionData) {
            return res.status(200).json({
                success: false,
                message: "No subscription found for this email"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subscription data found",
            data: subscriptionData.subscriptions
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get User Subscription API failed",
            error_message: error.message
        });
    }
}