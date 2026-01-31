 import express from 'express'
 import cors from 'cors'
 import dotenv from 'dotenv'
 import cookieParser from 'cookie-parser'
 import morgan from 'morgan'
 import helmet from 'helmet'
 import connectDB from './config/connectDB.js'
 import userRouter from './route/user.route.js'
 

 
 dotenv.config()

// express app
 const app = express()
 app.use(cors({
    credentials: true ,
    origin : process.env.FRONTEND_URL
 }))

 app.use(express.json())
 app.use(cookieParser())
 app.use(morgan())
 app.use(helmet({
    crossOriginResourcePolicy : false
 }))

 const PORT = process.env.PORT || 8000 
    app.get('/', (request, response) => {

        response.json({
            message : "server is runing vivek" + PORT
        })
       
    })

    app.use('/api/user', userRouter)
// first connect database and then cannect server

    connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })})

    .catch((error) => {
        console.log('Failed to connect to database', error)
    })
   

app.use(express.urlencoded({ extended: true }))
    