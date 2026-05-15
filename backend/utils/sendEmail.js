const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS
    }
});

const sendEmail = async (options) => {
    try {
        if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASS) {
            throw new Error("Email credentials are not set in ENV variables");
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: options.to,
            subject: options.subject,
            text: options.text
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");

    } catch (error) {
        console.log("Error sending email", error.message);
        throw error;
    }
};

module.exports = sendEmail;