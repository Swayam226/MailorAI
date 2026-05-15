const { BrevoClient } = require("@getbrevo/brevo");

const client = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
});

const sendEmail = async (options) => {
    try {
        if (!process.env.BREVO_API_KEY) {
            throw new Error("BREVO_API_KEY not set in ENV variables");
        }

        await client.transactionalEmails.sendTransacEmail({
            sender: { email: process.env.EMAIL_FROM },
            to: [{ email: options.to }],
            subject: options.subject,
            textContent: options.text
        });

        console.log("Email sent successfully");

    } catch (error) {
        console.log("Error sending email", error.message);
        throw error;
    }
};

module.exports = sendEmail;