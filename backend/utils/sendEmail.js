const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    family: 4
});

const sendEmail = async (options) => {

    try {

        if (
            !process.env.EMAIL_USER ||
            !process.env.EMAIL_PASS
        ) {
            throw new Error(
                "Email credentials are not set in ENV variables"
            );
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            text: options.text
        };

        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");

    } catch (error) {

        console.log(
            "Error sending email",
            error.message
        );

        throw error;
    }
};

module.exports = sendEmail;