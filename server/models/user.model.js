import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
 
    name: {
        type : String ,
        required : [true , "Please provide name"]
    },
    
    email: {
        type : String ,
        required : [true , "Please provide email"],
        unique : true
    },
    password : {
        type : String ,
        required : [true , "Please provide password"]
    },

    avtar : {
        type : String ,
        default : ""
    } ,

    mobile : {
        type : Number ,
        default : null
    } ,
     
    refresh_token : {
        type : String ,
        defoult : ""
    },

    verify_email :{
        type : Boolean ,
        default : false
    } ,

    last_login_date : {
        type : Date ,
        default : ""
    } ,

    status : {
        type : String ,
        enum : ["Active" , "Inactive" , "Suspended"] ,
        default : "active"
    },

    address_detail : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'address'
        }
    ] ,

     shopping_card : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'cartProduct'
        }
    ] ,
    
     orderHistory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'order'
        }
    ] ,
    
    forget_password_otp : {
        type : String ,
        default : null
    } ,

    forget_password_expiry : {
        type : Date ,
        default : ""
    } ,

    role :{
        type : String ,
        enum : ["ADMIN" , "USER"] ,
        default : "USER"
    } ,

},

{
    timeseriestamps : true
    
})

const UserMOdel = mongoose.model('user' , userSchema)

export default UserModel 