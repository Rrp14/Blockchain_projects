const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../../.env" }); // Adjust path if needed

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendCertificateEmail(to, subject, certDetails) {
  const htmlContent = `
    <h2>Your Certificate</h2>
    <p><strong>ID:</strong> ${certDetails.id}</p>
    <p><strong>Name:</strong> ${certDetails.name}</p>
    <p><strong>Course:</strong> ${certDetails.course}</p>
    <p><strong>Date:</strong> ${certDetails.date}</p>
    <p><strong>Issuer:</strong> ${certDetails.issuer}</p>
  `;

  const info = await transporter.sendMail({
    from: `"Cert Validator" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });

  console.log("📧 Email sent:", info.messageId);
}

module.exports = sendCertificateEmail;
