const nodemailer = require('nodemailer');
const config = require("../config");

/**
 * 
 * @param {string} email - Email to send the message
 * @param {string} subject - Subject of the email to sent
 * @param {string} text - Plain text to send in the emails message
 * @param {string} html - html to sent in the emails message (must be in string format)
 * 
 */

async function sendMail(email, subject, text = "", html = "") {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: config.EMAIL_HOST,
          pass: config.EMAIL_PASSWORD_HOST,
        },
      });
    
    await transporter.verify().then(() => {
        //console.log('Ready for send Emails')
    })
    
    let message = {
        from: config.EMAIL_HOST,
        to: email,
        subject: subject,
        text: text,
        html: html
    }
    
    try{
        await transporter.sendMail(message);
    }
    catch(e){
        console.log('ERROR ', e)
    }
}

module.exports = sendMail;