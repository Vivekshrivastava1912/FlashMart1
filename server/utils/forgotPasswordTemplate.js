const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="
    margin: 0;
    padding: 0;
    background-color: #f4f6f8;
    font-family: Arial, Helvetica, sans-serif;
  ">
    <div style="
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    ">
      <h2 style="
        text-align: center;
        color: #333333;
        margin-bottom: 20px;
      ">
        Password Reset Request
      </h2>

      <p style="
        font-size: 16px;
        color: #555555;
      ">
        Dear <strong>${name}</strong>,
      </p>

      <p style="
        font-size: 15px;
        color: #555555;
        line-height: 1.6;
      ">
        You requested a password reset. Please use the following OTP code to reset your password.
      </p>

      <div style="
        text-align: center;
        margin: 30px 0;
      ">
        <span style="
          display: inline-block;
          padding: 15px 30px;
          font-size: 24px;
          letter-spacing: 4px;
          font-weight: bold;
          color: #ffffff;
          background-color: #4f46e5;
          border-radius: 6px;
        ">
          ${otp}
        </span>
      </div>

      <p style="
        font-size: 14px;
        color: #666666;
        line-height: 1.6;
      ">
        This OTP is valid for <strong>1 hour only</strong>.  
        Enter this OTP in the FlashMart website to proceed with resetting your password.
      </p>

      <hr style="
        border: none;
        border-top: 1px solid #eeeeee;
        margin: 25px 0;
      " />

      <p style="
        font-size: 14px;
        color: #777777;
      ">
        Thanks,<br />
         <strong>vivek shrivastava</strong><br />
        <strong>FlahMartTeam</strong>
      </p>

      <p style="
        font-size: 12px;
        color: #999999;
        margin-top: 20px;
      ">
        If you did not request this, please ignore this email.
      </p>
    </div>
  </body>
  </html>
  `;
};

export default forgotPasswordTemplate;