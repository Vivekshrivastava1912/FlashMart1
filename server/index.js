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
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'; 

dotenv.config()

const app = express()

// 1. CORS Setup (Local & Production origins allowed to prevent CORS errors)
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://flash-mart-clent.vercel.app"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] 
}));

// 2. Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev')) 
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
app.use("/api/category", categoryRouter)
app.use("/api/file", uploadRouter)
app.use("/api/subcategory", subCategoryRouter)
app.use("/api/product", productRouter)


// 4. Database and Server Connection
const PORT = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log('Failed to connect to database', error)
})