import ProductSubscriptionDetail from "../../models/product_subscription_detail.model.js"
export const getProductPricing = async (req,res) =>{
    try {
        const { productName } = await req.body;

        if (!productName) { 
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            });
        }
        const productPricing =  await ProductSubscriptionDetail.findOne({ productName });

        if (!productPricing) { 
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product pricing fetched successfully",
            data: productPricing
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get Product Pricing API failed",
            error_message: error.message
        });
    }
}