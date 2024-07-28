import { createTransport } from "nodemailer";
require("dotenv").config();

// Creating a transporter
const transporter = createTransport({
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
    const info = await transporter.sendMail({
        from: "rastogisakshi0213@gmail.com",
        to,
        subject,
        text
    })
}

export default {sendMail};
