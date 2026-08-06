import app from "./src/app.js";
import dotenv from "dotenv";
import connectDb from "./src/config/connectDb.js";
dotenv.config()


connectDb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is listening at port: ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log("Database connection failed ",error);
})


