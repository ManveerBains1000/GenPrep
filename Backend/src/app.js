import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
// app routes
import authRoutes from './routes/auth.routes.js'
import interviewRoutes from "./routes/interview.routes.js"
app.use('/api/auth/',authRoutes)
app.use('/api/interview/',interviewRoutes)


app.use('/api/health',(req,res)=>{
    res.send('Health check passed')
})


export default app;

