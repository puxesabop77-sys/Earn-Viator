require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Mailer Configuration ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- API Routes for /sufiyan (Coin Control) ---

// Search User
app.get('/api/admin/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Balance
app.post('/api/admin/update-balance', async (req, res) => {
  const { userId, amount, type } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (type === 'add') {
      user.coins += parseFloat(amount);
    } else {
      user.coins -= parseFloat(amount);
    }

    await user.save();
    
    const transaction = new Transaction({
      userId: user._id,
      type,
      amount: parseFloat(amount),
      adminNote: `Updated by /sufiyan admin panel`
    });
    await transaction.save();

    res.json({ success: true, newBalance: user.coins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- API Routes for /mailev (Mailer) ---

app.post('/api/admin/send-bulk-mail', async (req, res) => {
  const { subject, body } = req.body;
  
  try {
    const users = await User.find({}, 'email');
    const emailList = users.map(u => u.email);

    if (emailList.length === 0) {
      return res.status(400).json({ message: 'No registered users found' });
    }

    // SMTP Mail Logic
    const mailOptions = {
      from: `"EarnViator" <${process.env.SMTP_USER}>`,
      to: emailList.join(','),
      subject: subject,
      html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd;">
              <h2>EarnViator Notification</h2>
              <div style="font-size: 16px;">${body}</div>
              <footer style="margin-top: 20px; color: #777;">&copy; 2024 EarnViator.com</footer>
             </div>`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: `Email sent to ${emailList.length} users.` });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

// Seed Initial User (Dev only)
app.post('/api/admin/seed', async (req, res) => {
  try {
    const defaultUser = new User({ email: 'test@example.com', coins: 1000 });
    await defaultUser.save();
    res.json({ message: 'Seeded test user successfully' });
  } catch (err) {
    res.json({ message: 'User already exists' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
