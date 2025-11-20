import Documents from "../../models/documents.model.js"
import Users from "../../models/users.model.js"
export const GetDocuments = async (req, res) => {
    try {
        const { email } = await req.body;

        const user = await Users.findOne({ email });
        if (!user)
            return res.json({ success: false, message: "This User Not Found Try Again" })

        const documents = await Documents.find({ email });

        return res.json({ success: true, message: "Get Document Details API Successfully Called",all_documents:documents})
    } catch (error) {
        return res.json({ success: false, message: "Get Document Details API Failed", error_message: error.message })
    }
}