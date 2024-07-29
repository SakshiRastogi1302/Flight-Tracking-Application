const nodemailer = require("nodemailer");
require("dotenv").config();

// Creating a transporter
const transporter = nodemailer.createTransport({
    service : 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "rastogisakshi0213@gmail.com",
      pass: "kylcixmpspxidiba"
    },
});


async function sendMail(to,subject,text){
    await transporter.sendMail({
        from: "rastogisakshi0213@gmail.com",
        to,
        subject,
        text
    })
}

module.exports = {sendMail}

