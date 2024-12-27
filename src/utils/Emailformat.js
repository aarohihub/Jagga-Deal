const generateOtpEmail = (fullName, otp) => {
    return `
        <div style="font-family: 'Comic Sans MS', cursive, sans-serif; line-height: 1.6; color: #333; background-color: #f2f2f2; padding: 20px; border-radius: 8px;">
          <h2 style="color: #FF6347; text-align: center; font-size: 30px;">Welcome to Our Awesome Service!</h2>
          <p style="font-size: 18px; text-align: center; color: #555;">Hey there, ${fullName} !</p>
          <p style="font-size: 16px; color: #555; text-align: center;">You're just one step away from greatness!</p>
          <h3 style="color: #FF4500; background-color: #fff; padding: 15px 25px; border-radius: 5px; text-align: center; font-size: 36px; margin: 20px 0;">
            ${otp}
          </h3>
          <p style="font-size: 14px; color: #555; text-align: center;">Use this Code to complete your registration.</p>
          <p style="font-size: 14px; color: #555; text-align: center;">The code is valid for 10 minutes, so make sure to use it soon!</p>
          <p style="font-size: 14px; color: #555; text-align: center;">If you didn’t request this, no worries—just ignore it, we won’t be offended! 😜</p>
          <br />
          <p style="font-size: 16px; color: #555; text-align: center;">Looking forward to having you onboard!</p>
          <p style="font-size: 14px; color: #555; text-align: center;">Cheers,</p>
          <p style="font-size: 14px; color: #555; text-align: center; font-weight: bold;">The Coolest Team Ever!</p>
        
          <footer style="margin-top: 40px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ccc; padding-top: 20px;">
            <p>&copy; 2024 Jaggal Deal. All rights reserved.</p>
            <p><a href="#" style="color: #FF6347; text-decoration: none; font-weight: bold;">Unsubscribe (if you must!)</a></p>
          </footer>
        </div>
      `;
  };
  
  module.exports = generateOtpEmail;
  