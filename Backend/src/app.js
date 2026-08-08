import express from 'express'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// app routes
import authRoutes from './routes/auth.routes.js'
app.use('/api/auth/',authRoutes)


app.use('/api/health',(req,res)=>{
    res.send('Health check passed')
})
export default app;

