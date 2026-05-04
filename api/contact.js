import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, subject, message) are required",
      });
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

    // Email to owner (with reply-to set to submitter)
    const ownerMailOptions = {
      from: `Durvesh More <${process.env.SMTP_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Message from Portfolio Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    };

    // Confirmation email to sender
    const senderMailOptions = {
      from: `Durvesh More <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "We received your message",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Thank you for contacting me!</h2>
          <p>Hi ${name},</p>
          <p>I have received your message and will get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <h3>Your Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p>Best regards,<br><strong>Durvesh More</strong></p>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      details: error.message,
    });
  }
}
