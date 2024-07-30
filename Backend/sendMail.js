const nodemailer = require("nodemailer");
require("dotenv").config();

// Creating a transporter
const transporter = nodemailer.createTransport({
    service : 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.DB_GMAIL_USER,
      pass: process.env.DB_GMAIL_PASSWORD
    },
});


async function sendMail(to,subject,text){
    const info = await transporter.sendMail({
        from: process.env.DB_GMAIL_USER,
        to,
        subject,
        text
    })
}

module.exports = {sendMail}

