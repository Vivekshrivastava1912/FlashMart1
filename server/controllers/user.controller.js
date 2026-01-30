import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

export async function registerUserController(request, response) {

    try {
    const { name, email, password } = request.body;
    
    if(!name || !email || !password)
{
    return response.status(400).json({ 
        message: "Name, email and password are required.",
        error : true , 
        success : false
    })
}

const user = await UserModel.findOne({ email })

if(user){
    return response.json({
        message: "User already exists with this email.",
        error : true ,
        success : false
    })
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const payload = {
    name,
    email,
    password: hashedPassword
}

const newUser = new UserModel(payload);
const save = await newUser.save()
const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

const verifyemail = await sendEmail({
    sendTo : email,
    subject : "Welcome to FlashMart - Verify your email",
    html : verifyEmailTemplate({
        name , url : VerifyEmailUrl
    })
})
return response.json({
    message: "User registered successfully. Please check your email to verify your account.",
    error : false ,
    success : true ,
    data : save 
})

    } catch (error) {
     return response.status(500).json({ 
        message: error.message || error ,
        error : true , 
        success : false
    
    });

    }




}