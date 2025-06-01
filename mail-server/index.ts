import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// --- CORS Setup ---
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());

// --- Send Email via Gmail SMTP with App Password ---
async function sendMail(to: string, subject: string, body: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });



  return transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    html: body
  });
}

// --- API Route ---
app.post("/", async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    const info = await sendMail(to, subject, body);
    console.log("Mail send", info)
    res.json({ message: "Email sent", info });
  } catch (error) {
    console.error("Err", error)
    res.status(500).json({ error: "Failed to send email", details: error });
  }
});

// --- Start Server ---
const PORT = 3001;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
