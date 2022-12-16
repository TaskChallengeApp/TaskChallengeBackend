const express = require('express');
const dotenv = require("dotenv")
const morgan = require("morgan")
const connectDB = require("./config/db")
const colors = require("colors")
const mongoSanitize = require("express-mongo-sanitize")
const errorHandler = require("./middlewares/error")
const xss = require("xss-clean")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const helmet = require("helmet")
const cors = require("cors")



// Load env vars 
dotenv.config({path: './config/config.env'})

// Connect to database
connectDB()

// Route files
//const plants = require("./routes/plants")
//const auth = require("./routes/auth")
//const searchPlants = require("./routes/searchPlants")


const app = express()

// Body parser 
app.use(express.json())


// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"))
}

// Sanitize Data
app.use(mongoSanitize())

// Prevent XSS attacks
app.use(xss())

// Set security headers
app.use(helmet())


// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max : 100
})

app.use(limiter)


// Prevent http param pollution
app.use(hpp())


// Enable CORS
app.use(cors())

// Mount routers
//app.use("/api/v1/auth", auth)
//app.use("/api/v1/plants", plants)
//app.use("/api/v1/searchPlants",searchPlants)

app.use(errorHandler)

const PORT = process.env.PORT || 5050

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server & exit process
    server.close(() => process.exit(1))
})
