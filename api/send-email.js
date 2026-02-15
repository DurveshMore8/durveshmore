import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
  } catch (err) {
    console.error("SMTP verify failed:", err);
    return res
      .status(500)
      .json({ error: "SMTP connection failed", details: err.message });
  }

  const ownerMailOptions = {
    from: `Durvesh More <${process.env.SMTP_EMAIL}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <h2>New Message from Portfolio Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
    replyTo: email,
  };

  const senderMailOptions = {
    from: `Durvesh More <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "We received your message",
    html: `
      <h2>Thank you for contacting me!</h2>
      <p>Hi ${name},</p>
      <p>I have received your message and will get back to you as soon as possible.</p>
      <p><strong>Your Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <p>Best regards,<br>Durvesh More</p>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
}
