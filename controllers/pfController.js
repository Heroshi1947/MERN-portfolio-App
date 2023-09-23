const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { name, email, msg } = req.body;
  console.log(name, email, msg);

  const textContent = `Name: ${name}\n\nMessage: ${msg}`;

  var mailOptions = {
    from: name,
    to: process.env.SMTP_MAIL,
    // to: email,
    subject: email,
    // text: textContent,
    html: `
    <h5>Detail Information</h5>
     <ul>
    <li><p>Name : ${name}</p></li>
    <li><p>Email : ${email}</p></li>
    <li><p>Message: ${msg}</p></li>
    </ul> `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log("Email sent successfully!");
      return res.status(200).send({
        success: true,
        message: "Your Message Send Successfully",
      });
    }
  });
});

module.exports = { sendEmail };
