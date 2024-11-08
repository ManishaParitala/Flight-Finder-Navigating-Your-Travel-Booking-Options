// import { response } from 'express';
import nodemailer from 'nodemailer';





export const SendForgotPassword = async (email: string, otp: string) => {
  // Configure the transporter with your Gmail credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cse.takeoff@gmail.com', // Your email here
      pass: 'digkagfgyxcjltup',  // Your email password here (consider using App Passwords)
    },
  });

  // Create the email content with the updated HTML structure for Flight Booking
  const mailOptions = {
    from: 'cse.takeoff@gmail.com', // Sender address
    to: email,                                           // List of receivers
    subject: 'Your OTP for Flight Booking Password Reset', // Subject line
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; border-radius: 5px;">
          <h2>Your OTP for Flight Booking Password Reset</h2>
        </div>
        <div style="background-color: white; padding: 20px; margin-top: 10px; border-radius: 5px;">
          <p>Dear User,</p>
          <p>We received a request to reset your password for your Flight Booking account. To proceed, please use the following One-Time Password (OTP) to reset your password:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #333;">${otp}</span>
          </div>
          <p>This OTP is valid for the next 10 minutes.</p>
          <p>If you did not request this password reset, please ignore this email.</p>
          <p>Best regards,<br/>Flight Booking Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Flight Booking Service. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (err) {
    console.log(err);
    throw new Error('Mail connection invalid or failed to send email');
  }
};



export const SendOrderConfirm = async (toEmail: any, orderDetails: any) => {
    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cse.takeoff@gmail.com', 
        pass: 'digkagfgyxcjltup',  
      },
    });
  
   
    const mailOptions = {
      from: '"cse.takeoff@gmail.com"', 
      to: toEmail,                                            
      subject: 'Order Confirmation - Your Flight Booking',    
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; border-radius: 5px;">
            <h2>Your Flight Booking is Confirmed</h2>
          </div>
          <div style="background-color: white; padding: 20px; margin-top: 10px; border-radius: 5px;">
            <p>Dear Customer,</p>
            <p>Thank you for booking with our flight service. Your order has been successfully confirmed.</p>
            <h3>Order Details:</h3>
            <ul>
              <li><strong>Flight Name:</strong> ${orderDetails.flightName}</li>
              <li><strong>Flight Number:</strong> ${orderDetails.flightNumber}</li>
              <li><strong>From:</strong> ${orderDetails.from}</li>
              <li><strong>To:</strong> ${orderDetails.to}</li>
              <li><strong>Date:</strong> ${orderDetails.date}</li>
              <li><strong>Seat Type:</strong> ${orderDetails.seatType}</li>
              <li><strong>Total Price:</strong> $${orderDetails.totalPrice}</li>
            </ul>
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Best regards,<br/>Flight Booking Team</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #777;">
            <p>&copy; ${new Date().getFullYear()} Flight Booking Service. All rights reserved.</p>
          </div>
        </div>
      `,
    };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log(`Order confirmation email sent to ${toEmail}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Could not send order confirmation email');
    }
  };



// export default SendForgotPassword;