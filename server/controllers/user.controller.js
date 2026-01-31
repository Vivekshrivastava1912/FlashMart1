import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';



// registration controller hai jise user ka data database me save kar rahe hai
export async function registerUserController(request, response) {

    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Name, email and password are required.",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return response.json({
                message: "User already exists with this email.",
                error: true,
                success: false
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
            sendTo: email,
            subject: "Welcome to FlashMart - Verify your email",
            html: verifyEmailTemplate({
                name, url: VerifyEmailUrl
            })
        })
        return response.json({
            message: "User registered successfully. Please check your email to verify your account.",
            error: false,
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false

        });

    }




}

//email me jo link hai use verify kar rahe hai
export async function verifyEmailController(request, response) {
    try {
        const {code} = request.body
        const user = await UserModel.findOne({ _id: code })

        if (!user) {
            return response.status(400).json({
                message: "Invalid verification code....",
                error: true,
                success: false
            })

        }
        const updatedUser = await UserModel.updateOne({
            _id: code
        },
            { verify_email: true })

        return response.json({
            message: "Email verified successfully.",
            error: false,
            success: true
        })


    }


    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// email or password ke through login kar rahe hai

export async function loginController(request, response) {


    try {
        const { email, password } = request.body
        const user = await UserModel.findOne({ email })

       if(!email || !password){
        return response.status(400).json({
            message: "Email and password are required ....",
            error: true,
            success: false
        })
       }



        if (!user) {
          return  response.status(400).json({
                message: "User not found with this email.",
                error: true,
                success: false
            })
        }

        if (user.status !== "Active") {
            return response.status(400).json({
                message: "Your account is not active. Please contact support.",
                error: true,
                success: false
            })
        }
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return response.status(400).json({
                message: "cheack your password."
                , error: true,
                success: false
            })
        }

const accesstoken = await generatedAccessToken(user._id)
const refreshtoken = await generatedRefreshToken(user._id)
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
}



 response.cookie('accessToken', accesstoken,cookieOptions )
  response.cookie('refreshToken', refreshtoken,cookieOptions )

        return response.json({
            message: "Login successful.",
            error: false,
            success: true,
            data: {
                accesstoken ,
                refreshtoken
            }
        })

    }
    catch (error) {

        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }



}

//logout controller

export async function logoutController(request, response) {
    try{

    const userId = request.userId;//midellware se araha hai
        const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
}

     response.clearCookie('accessToken',cookieOptions),
     response.clearCookie('refreshToken',cookieOptions)


const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{
    refreshToken: ""
})



        return response.json({
            message: "Logout successful...",
            error: false,
            success: true
        })
    }
    catch(error){
        return response.status(500).json({
            message: error.message || error ,
            error: true,
            success: false
        })
    }
}