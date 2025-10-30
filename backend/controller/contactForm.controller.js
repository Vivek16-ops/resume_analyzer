import ContactForm from "../models/contact.model.js";

export const contactFormAPI = async (req, res) => {
    try {
        const { fullName, email, phone, query } = await req.body;

        console.log("Contact Form Data Received:");

        if (!fullName || !email || !phone || !query) {
            return res.status(400).json({ success: false, message: "All Fields are required" })
        }

        const existingUser = await ContactForm.findOne({ email });

        if (existingUser) {
            // Append phone if it's new
            if (phone && !existingUser.phone.includes(phone)) {
                existingUser.phone.push(phone);
                await existingUser.save();
            }

            // Always append query
            existingUser.query.push(query);
            await existingUser.save();

            return res.json({ success: true, message: "Your Queries have been submitted successfully! Our team will get back to you shortly." })
        }

        // Create a new entry
        const newContactForm = new ContactForm({
            fullName,
            email,
            phone: phone ? [phone] : [],
            query: [query],
        });

        await newContactForm.save();

        return res.json({ success: true, message: "Your Queries have been submitted successfully! Our team will get back to you shortly." })

    } catch (error) {
        return res.json({ success: false, message: "Contact Form API failed", error_message: error.message })
    }
}