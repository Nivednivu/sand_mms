const jwt = require('jsonwebtoken');
const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();
const users = require('./userScheema.js');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY


exports.register = async (req,res)=>{
    const {fullname,email,mobilenumber,district,username,password} = req.body
    try {
      const existingUser = await users.findOne({email})
      if(existingUser){
        res.status(200).json({message:"user already register"})
      }else{
        const newUser = new users({fullname,email,mobilenumber,district,username,password})
        await newUser.save()
        res.status(200).json(newUser) 
      }
    } catch (error) {
      res.status(400).json(error)
    }

}


exports.login = async (req,res)=>{
    const {username,password} = req.body
    try {
      const existingUser = await users.findOne({username,password})
      if(existingUser){
        res.status(200).json({message:"userlogin sucess"})
      }else{
        res.status(404).json({message:"invalid username or password"})
      }
    } catch (error) {
      res.status(400).json(error)
    }
} 







const otpRequests = new Map();

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Generate new 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    // Store OTP in memory/database
    otpRequests.set(email, { otp, expiry: otpExpiry, attempts: 0 });

    // Create API instance
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    // Email content
    const sender = {
      email: process.env.SENDER_EMAIL || 'nivedtp6@gmail.com',
      name: 'Your App Name'
    };
    
    const receivers = [{ email }];
    
    // Send OTP email
    const result = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Your OTP Code',
      htmlContent: generateOtpEmailHtml(otp),
      textContent: generateOtpEmailText(otp),
      params: { otp, expiry: otpExpiry.toISOString() }
    });

    res.status(200).json({ 
      message: "OTP sent successfully",
      // For development only
      debugInfo: process.env.NODE_ENV === 'development' ? { otp } : undefined
    });

  } catch (error) {
    console.error('Brevo OTP Error:', error);
    res.status(500).json({ 
      error: "Failed to send OTP",
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Check if previous OTP exists
    const existingOtp = otpRequests.get(email);
    
    // If no existing OTP or expired, treat as new request
    if (!existingOtp || new Date(existingOtp.expiry) < new Date()) {
      return exports.sendOtp(req, res);
    }

    // Check resend attempts (max 3 times)
    if (existingOtp.attempts >= 3) {
      return res.status(429).json({ 
        error: "Maximum resend attempts reached. Please try again later." 
      });
    }

    // Increment attempt count
    existingOtp.attempts++;
    otpRequests.set(email, existingOtp);

    // Create API instance
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    // Email content
    const sender = {
      email: process.env.SENDER_EMAIL || 'nivedtp6@gmail.com',
      name: 'Your App Name'
    };
    
    const receivers = [{ email }];
    
    // Resend the same OTP
    const result = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Your OTP Code (Resent)',
      htmlContent: generateOtpEmailHtml(existingOtp.otp, true),
      textContent: generateOtpEmailText(existingOtp.otp, true),
      params: { 
        otp: existingOtp.otp,
        expiry: existingOtp.expiry.toISOString() 
      }
    });

    res.status(200).json({ 
      message: "OTP resent successfully",
      // For development only
      debugInfo: process.env.NODE_ENV === 'development' ? { 
        otp: existingOtp.otp,
        attempts: existingOtp.attempts 
      } : undefined
    });

  } catch (error) {
    console.error('Brevo Resend OTP Error:', error);
    res.status(500).json({ 
      error: "Failed to resend OTP",
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};



// Helper functions for email templates
function generateOtpEmailHtml(otp, isResend = false) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">OTP Verification ${isResend ? '(Resent)' : ''}</h2>
      <p>Your One-Time Password (OTP) for verification is:</p>
      <div style="background: #f3f4f6; padding: 15px; text-align: center; margin: 20px 0; border-radius: 5px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #2563eb;">${otp}</span>
      </div>
      <p>This OTP is valid for <strong>15 minutes</strong>. Please do not share it with anyone.</p>
      ${isResend ? '<p style="color: #dc2626;">This is a resent OTP. Your previous code is no longer valid.</p>' : ''}
      <p>If you didn't request this OTP, please ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="font-size: 12px; color: #6b7280;">© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
    </div>
  `;
}

function generateOtpEmailText(otp, isResend = false) {
  return `
    OTP Verification ${isResend ? '(Resent)' : ''}
    =============================${isResend ? '=' : ''}
    
    Your One-Time Password (OTP) is: ${otp}
    
    This OTP is valid for 15 minutes. Please do not share it with anyone.
    ${isResend ? '\nThis is a resent OTP. Your previous code is no longer valid.\n' : ''}
    If you didn't request this OTP, please ignore this email.
  `;
}



