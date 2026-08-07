import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded())


// app routes
import authRoutes from './routes/auth.routes.js'
app.use('/api/auth/',authRoutes)


app.use('/api/health',(req,res)=>{
    res.send('Health check passed')
})
export default app;

