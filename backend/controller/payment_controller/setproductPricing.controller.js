import ProductSubscriptionDetail from "../../models/product_subscription_detail.model.js"
import Users from "../../models/users.model.js"

export const setProductPricing = async (req, res) => {
    try {
        const {
            productName,
            basic,
            premium,
            enterprise,
            email
        } = await req.body;

        // Check if user is admin
        const user = await Users.findOne({ email });
        if (!user || !user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }
        
        // Validate required fields
        if (!productName || !basic || !premium || !enterprise) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Create or Update product pricing
        const product = await ProductSubscriptionDetail.findOneAndUpdate(
            { productName },
            {
                productName,
                basic,
                premium,
                enterprise
            },
            { new: true, upsert: true }  // <— creates if not exists
        );

        return res.status(200).json({
            success: true,
            message: "Product pricing saved successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Set Product Pricing API failed",
            error_message: error.message
        });
    }
}