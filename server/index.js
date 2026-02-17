import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'

dotenv.config()

const app = express() // <--- Ye line missing thi ya niche thi

// 1. CORS Setup (Fixed for localhost:5173)
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}))

// 2. Middlewares (Sahi order mein)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev')) // Fixed Morgan
app.use(helmet({
    crossOriginResourcePolicy: false
}))

// 3. Routes
app.get('/', (request, response) => {
    response.json({
        message: "Server is running vivek " + (process.env.PORT || 8000)
    })
})

app.use('/api/user', userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file", uploadRouter)

// 4. Database and Server Connection
const PORT = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log('Failed to connect to database', error)
})