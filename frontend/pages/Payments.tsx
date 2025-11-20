import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TierPricing {
    monthly: number;
    yearly: number;
}

interface PricingData {
    _id: string;
    productName: string;
    basic: TierPricing;
    premium: TierPricing;
    enterprise: TierPricing;
    __v: number;
}

interface ApiResponse {
    success: boolean;
    data: PricingData;
    message?: string;
}

const PaymentsPage = () => {
    const { productName } = useParams<{ productName: string }>();

    const [pricingData, setPricingData] = useState<PricingData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedTier, setSelectedTier] = useState<"basic" | "premium" | "enterprise">("basic");
    const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");

    useEffect(() => {
        fetchPricing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPricing = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/productPricing/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productName }),
            });

            const result: ApiResponse = await response.json();

            if (result.success) {
                setPricingData(result.data);
            }
        } catch (error) {
            console.error("Pricing fetch failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const getFinalPrice = () => {
        if (!pricingData) return 0;
        return pricingData[selectedTier][selectedPlan];
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="
            backdrop-blur-md
            bg-white/5
            p-10
            rounded-3xl
            border border-white/15
            w-full max-w-3xl
            relative overflow-hidden
        "
            >

                <h1 className="text-4xl font-bold text-white text-center mb-4">
                    {productName} — Payment
                </h1>

                <p className="text-center text-white/70 mb-10 text-lg">
                    Choose your preferred plan
                </p>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="flex space-x-2">
                            <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></span>
                            <span className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-150"></span>
                            <span className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-300"></span>
                        </div>
                        <p className="text-center text-white/80 mt-4 text-lg">
                            Please wait while price info gathers...
                        </p>
                    </div>

                ) : pricingData ? (
                    <>
                        {/* Plan Tier Selector */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {(["basic", "premium", "enterprise"] as const).map((tier) => (
                                <motion.button
                                    key={tier}
                                    onClick={() => setSelectedTier(tier)}
                                    whileHover={{ scale: 1.05 }}
                                    className={`p-4 rounded-xl font-semibold text-white transition-all duration-300
                                ${selectedTier === tier
                                            ? "bg-gradient-to-br from-purple-600 to-pink-600 scale-105"
                                            : "bg-white/10 hover:bg-white/20"
                                        }
                            `}
                                >
                                    {tier.charAt(0).toUpperCase() + tier.slice(1)}

                                    <ul className="mt-3 text-sm text-white/70 space-y-1">
                                        {tier === "basic" && (
                                            <>
                                                <li>✔ Essential Tools</li>
                                                <li>✔ Limited Support</li>
                                                <li>✔ Monthly Analytics</li>
                                            </>
                                        )}
                                        {tier === "premium" && (
                                            <>
                                                <li>✔ Everything in Basic</li>
                                                <li>✔ Priority Support</li>
                                                <li>✔ Advanced Analytics</li>
                                                <li>✔ AI-powered Insights</li>
                                            </>
                                        )}
                                        {tier === "enterprise" && (
                                            <>
                                                <li>✔ All Premium Features</li>
                                                <li>✔ 24×7 Dedicated Support</li>
                                                <li>✔ Unlimited Users</li>
                                                <li>✔ Custom Integrations</li>
                                                <li>✔ SLA Guarantee</li>
                                            </>
                                        )}
                                    </ul>
                                </motion.button>
                            ))}
                        </div>

                        {/* Monthly / Yearly */}
                        <div className="flex justify-center gap-6 mb-8">
                            {(["monthly", "yearly"] as const).map((plan) => (
                                <motion.button
                                    key={plan}
                                    onClick={() => setSelectedPlan(plan)}
                                    whileHover={{ scale: 1.05 }}
                                    className={`
                                px-6 py-2 rounded-xl text-white font-semibold transition-all
                                ${selectedPlan === plan
                                            ? "bg-gradient-to-r from-pink-500 to-purple-600 scale-105"
                                            : "bg-white/10 hover:bg-white/20"
                                        }
                            `}
                                >
                                    {plan.charAt(0).toUpperCase() + plan.slice(1)}
                                </motion.button>
                            ))}
                        </div>

                        {/* Price Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="
                        bg-white/5
                        border border-white/15
                        backdrop-blur-md
                        p-6
                        rounded-2xl
                        mb-10
                    "
                        >
                            <h2 className="text-center text-white text-2xl font-bold">
                                Final Price
                            </h2>

                            <p className="text-center text-5xl font-extrabold text-purple-300 mt-2">
                                ₹{getFinalPrice()}
                            </p>

                            <p className="text-center text-white/60 mt-1 text-sm">
                                {selectedTier} • {selectedPlan}
                            </p>
                        </motion.div>

                        {/* Pay Button */}
                        <div className="flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.9 }}
                                className="
                            relative px-12 py-4 text-lg font-semibold text-white
                            rounded-2xl overflow-hidden
                            bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                            transition-all
                        "
                            >
                                <span className="relative z-10">Proceed to Pay</span>
                            </motion.button>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-red-400">Product not found</p>
                )}
            </motion.div>
        </div>
    );
}

export default PaymentsPage
