import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import conversationRoutes from './routes/conversationRoute.js'

dotenv.config()

const app = express()

connectDB()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/conversations', conversationRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || 5000, () => console.log(`Port running on ${process.env.PORT || 3000}...`))
