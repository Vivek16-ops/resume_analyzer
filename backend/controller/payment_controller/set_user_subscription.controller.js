import UserSubscription from "../../models/user_subscription.model.js";
import ProductSubscriptionDetail from "../../models/product_subscription_detail.model.js";
import Users from "../../models/users.model.js";

const calculateEndDate = (subscriptionPlan) => {
    const start = new Date();
    const end = new Date(start);

    if (subscriptionPlan === "monthly") {
        end.setMonth(end.getMonth() + 1);
    } else {
        end.setFullYear(end.getFullYear() + 1);
    }

    return end;
};

export const set_user_subscription = async (req, res) => {
    try {
        const {
            email,
            payment_id,
            productName,
            subscriptionType,
            subscriptionPlan,
            payment_amount
        } = await req.body;

        if (!email || !productName || !subscriptionType || !subscriptionPlan || !payment_id || !payment_amount) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const productSubscriptionDetail = await ProductSubscriptionDetail.findOne({ productName });

        if (!productSubscriptionDetail) {
            return res.status(404).json({
                success: false,
                message: "The product you want to subscribe to does not exist"
            });
        }

        // Checking if payment amount  altered or not by user
        if (subscriptionType === "basic" && ((subscriptionPlan === "monthly" && payment_amount !== productSubscriptionDetail.basic.monthly) || (subscriptionPlan === "yearly" && payment_amount !== productSubscriptionDetail.basic.yearly)) ||
            subscriptionType === "premium" && ((subscriptionPlan === "monthly" && payment_amount !== productSubscriptionDetail.premium.monthly) || (subscriptionPlan === "yearly" && payment_amount !== productSubscriptionDetail.premium.yearly)) ||
            subscriptionType === "enterprise" && ((subscriptionPlan === "monthly" && payment_amount !== productSubscriptionDetail.enterprise.monthly) || (subscriptionPlan === "yearly" && payment_amount !== productSubscriptionDetail.enterprise.yearly))) {
            return res.status(400).json({
                success: false,
                message: "Payment amount has been altered. Subscription creation failed. Reporting to admin."
            });
        }


        const endDate = calculateEndDate(subscriptionPlan);

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "This User not found.Subscription can't be created."
            });
        }

        let userDetail = await UserSubscription.findOne({ email });

        // userDetail :- subscription detail of the user

        // CASE 1: USERDETAIL NOT FOUND → CREATE USER WITH FIRST SUBSCRIPTION
        if (!userDetail) {
            userDetail = await UserSubscription.create({
                email,
                subscriptions: [{
                    payment_id,
                    productName,
                    subscriptionType,
                    subscriptionPlan,
                    startDate: new Date(),
                    endDate,
                    isActive: true
                }]
            });

            user.subscriptions.push(userDetail._id);
            await user.save();

            return res.status(201).json({
                success: true,
                message: "Subscription created successfully",
                data: userDetail
            });
        }

        // CASE 2: USERDETAIL EXISTS → CHECK IF PRODUCT EXISTS
        const index = userDetail.subscriptions.findIndex(
            sub => sub.productName === productName
        );

        // A. PRODUCT NOT FOUND → ADD NEW SUBSCRIPTION
        if (index === -1) {
            userDetail.subscriptions.push({
                payment_id,
                productName,
                subscriptionType,
                subscriptionPlan,
                startDate: new Date(),
                endDate,
                isActive: true
            });

            await userDetail.save();

            return res.json({
                success: true,
                message: "New product subscription added",
                data: userDetail
            });
        }

        // B. PRODUCT FOUND → CHECK UPGRADE POSSIBILITY
        const existingSub = userDetail.subscriptions[index];

        const subscriptionRanks = {
            basic: 1,
            premium: 2,
            enterprise: 3
        };

        const oldRank = subscriptionRanks[existingSub.subscriptionType];
        const newRank = subscriptionRanks[subscriptionType];

        // if isActive is false, allow any change
        if (!existingSub.isActive) {
            userDetail.subscriptions[index].payment_id = payment_id;
            userDetail.subscriptions[index].subscriptionType = subscriptionType;
            userDetail.subscriptions[index].subscriptionPlan = subscriptionPlan;
            userDetail.subscriptions[index].startDate = new Date();
            userDetail.subscriptions[index].endDate = endDate;
            userDetail.subscriptions[index].isActive = true;
            await userDetail.save();

            return res.json({
                success: true,
                message: `Congrates you subscribed again to ${subscriptionType} plan`,
                data: userDetail
            });
        }

        if (newRank === oldRank) {
            return res.status(400).json({
                success: false,
                message: `User already has ${existingSub.subscriptionType} plan for this product`
            });
        }

        if (newRank < oldRank) {
            return res.status(400).json({
                success: false,
                message: `Cannot downgrade subscription from ${existingSub.subscriptionType} to ${subscriptionType}`
            });
        }

        // C. VALID UPGRADE → APPLY UPDATE
        userDetail.subscriptions[index].payment_id = payment_id;
        userDetail.subscriptions[index].subscriptionType = subscriptionType;
        userDetail.subscriptions[index].subscriptionPlan = subscriptionPlan;
        userDetail.subscriptions[index].startDate = new Date();
        userDetail.subscriptions[index].endDate = endDate;
        userDetail.subscriptions[index].isActive = true;

        await userDetail.save();

        return res.json({
            success: true,
            message: `Subscription upgraded to ${subscriptionType} plan`,
            data: userDetail
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to set user subscription",
            error_message: error.message
        });
    }
};
