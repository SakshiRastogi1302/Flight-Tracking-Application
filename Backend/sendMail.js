const nodemailer = require("nodemailer");
require("dotenv").config();

// Creating a transporter
const transporter = nodemailer.createTransport({
    service : 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "rastogisakshi0213@gmail.com",
      pass: "kylcixmpspxidiba"
    },
});


async function sendMail(to,subject,text){
    console.log("1111 Send");
    const info = await transporter.sendMail({
        from: "rastogisakshi0213@gmail.com",
        to,
        subject,
        text
    })
}

module.exports = {sendMail}

