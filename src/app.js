
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({
    limit:"16KB"
}))
app.use(express.urlencoded())
app.use(cookieParser())
app.use(express.static("public"))

import userRouter from './routes/user.routes.js'
app.use("/api/v1/user",userRouter)





export {app}