import app from "./src/app.js";
import dotenv from "dotenv";
import connectDb from "./src/config/connectDb.js";
dotenv.config()
import { generateInterviewReport,invokeGeminiAi } from "./src/services/ai.service.js";
invokeGeminiAi()
// import { resume,selfDescription,jobDescription } from "./src/services/temp.js";

// generateInterviewReport({resume, selfDescription,jobDescription})

connectDb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is listening at port: ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log("Database connection failed ",error);
})


