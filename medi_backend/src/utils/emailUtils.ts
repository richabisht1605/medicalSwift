import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // email options
    const mailOptions = {
      from: `"MediSwift" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    // send email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};
