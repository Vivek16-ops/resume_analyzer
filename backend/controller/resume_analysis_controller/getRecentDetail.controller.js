import User from "../../models/users.model.js";
import Documents from "../../models/documents.model.js";

export const getRecentDetail = async (req, res) => {
  try {
    const { email } = req.body;

    // Step 1: Validate user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found to fetch resume analysis detail"
      });
    }

    // Step 2: Fetch latest document for the user
    const latestDoc = await Documents.findOne({ email })
      .sort({ createdAt: -1 }) // Sort by newest
      .lean();

    if (!latestDoc) {
      return res.json({
        success: false,
        message: "No document found for this user"
      });
    }

    // Step 3: Return the document detail
    return res.json({
      success: true,
      message: "Latest resume analysis fetched successfully",
      document: latestDoc
    });

  } catch (error) {
    return res.json({
      success: false,
      message: "Get Recent Detail API failed",
      error_message: error.message
    });
  }
};