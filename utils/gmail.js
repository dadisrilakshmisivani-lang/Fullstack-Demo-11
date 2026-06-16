require('dotenv').config({
    path: '../.env'
});
const nodemailer = require('nodemailer');

// Step 1: transporter
let mail = async (email,username) => {
    try {

        const transporter =
nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

        // Step 2: compose message
        let message = {
            from: process.env.EMAIL_USER,
            to:email,
            subject: 'AccountCreation',
            text: `Hi!! ${username} your account is succesfully created`,
            html: '<b>Registration</b>',
        };

        // Step 3: send email
        await transporter.sendMail(message);

        console.log("Email sent successfully");

    }
    catch (error) {
        console.log(error.message);
    }
};

module.exports = mail;