
const verifyEmailTemplate = ({ name, url }) => {
   
  // email ka template hai jo email to degin kar rah hai
  
  return `

<p>Dera ${name},</p>
 <p style="font-size:15px; line-height:1.6;">
                Thank you for creating an account with <strong>FlashMart</strong>.
                To continue and activate your account, please verify your email address.
              </p>

               <p style="font-size:15px; line-height:1.6;">
                Click the button below or use the verification code provided to complete the process.
              </p>

<a href= "${url}" style="background-color: #7264ec; color: white; padding: 10px 20px; text-align: center; text-decoration: none;
 display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 8px;">   Verify Email </a>

   <p style="font-size:14px; line-height:1.6; color:#555555;">
                If you did not create an account using this email address,
                you can safely ignore this message.
              </p>
<p style="font-size:14px; margin:0;">
                Warm regards,<br>
                <strong>Vivek Shrivastava</strong><br>
                Author & Developer<br>
                FlashMart Team
              </p>
`
}

export default verifyEmailTemplate;

