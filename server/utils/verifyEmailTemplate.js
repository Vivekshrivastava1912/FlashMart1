
 import express from 'express'

 
const verifyEmailTemplate = (name, url) => {
    return `
<p>Hi ${name},</p>
<p>Thank you for registering with FlashMart! Please verify your email address by clicking the link below:</p>
<a href="${url}" style="display: inline-block; margin-top: 10px; color: #7264ec;">${url}</a>

<button style="background-color: #7264ec; color: white; padding: 10px 20px; text-align: center; text-decoration: none;
 display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 8px;">   VERify Email </buton>



`
}

export default verifyEmailTemplate;

