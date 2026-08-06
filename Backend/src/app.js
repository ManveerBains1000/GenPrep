import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded())


// app routes
import authRoutes from './routes/auth.routes'
app.use('api/auth/',authRoutes)

export default app;

