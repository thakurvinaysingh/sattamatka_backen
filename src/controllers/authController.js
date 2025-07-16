// controllers/user.js
import User         from '../models/User.js';
import jwt          from 'jsonwebtoken';
import bcrypt       from 'bcrypt';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import crypto       from 'crypto';
import { sendOtpEmail } from '../utils/email.js';

const generateToken = user =>
  jwt.sign({ id: user._id, role: user.role },
           process.env.JWT_SECRET,
           { expiresIn: '7d' });

// helper to create + send an OTPrs
async function createAndSendOtp(user) {
  const otp = crypto.randomInt(100000, 999999).toString();
  user.emailOtpCode    = otp;
  user.emailOtpExpires = Date.now() + 10*60*1000; // 10 min
  await user.save();
  await sendOtpEmail(user.email, otp);
}

// ─────────────── REGISTER ───────────────
export const register = async (req, res) => {
  try {
    let {  password  } = req.body;
    email = email.trim().toLowerCase();

    // 1) validate phone
    const parsed = parsePhoneNumberFromString(phoneNumber, countryCode);
    if (!parsed || !parsed.isValid()) {
      return res.status(400)
                .json({ message: 'Invalid phone number for ' + countryCode });
    }

    // 2) check existing
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // 3) hash + create
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      mobile: {
        countryCode: parsed.country,           // e.g. “IN”
        phoneNumber: parsed.format('E.164')    // e.g. “+91XXXXXXXXXX”
      }
    });

    // 4) send verification OTP
    await createAndSendOtp(user);

    res.status(201).json({
      message: 'Registered – please verify your email (OTP sent).'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// ─────────────── LOGIN ───────────────
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // if not verified, re-send OTP
    if (!user.isEmailVerified) {
      await createAndSendOtp(user);
      return res.status(403).json({
        message: 'Email not verified – OTP resent to your inbox.'
      });
    }

    // on success
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
