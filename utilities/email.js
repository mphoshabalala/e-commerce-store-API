const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // WITH ACTUAL GMAIL
  // 1) create a transporter
  //   const transporter = nodemailer.createTransport({
  //     service: "Gmail",
  //     auth: {
  //       user: process.env.EMAIL_USERNAME,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  //     // during gmail you need to activate less secure app option
  //   });

  // WITH MAILTRAP
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) define the email option
  const mailOptions = {
    from: "Mpho Shabalala <mphoshabalala3401@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) send the email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
