import {GoogleGenAI} from "@google/genai"
import { z } from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema'
import { env } from "../config/env.js";

console.log(env.GEMINI_API_KEY)
const ai = new GoogleGenAI({
     apiKey: process.env.GEMINI_API_KEY  
});

export async function invokeGeminiAi(){
    const response = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: "Hello gemini ! Explain what is interview ?"
    })

    console.log("Response content: ",response.output_text)
}

const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question may be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind the technical question"),
        answer: z.string().describe("How to answer the technical question, what points to cover in the answer, and what is the appropriate answer to the technical question")
    })).describe("The technical questions that may be asked in the interview along their intention and answer"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question may be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind the behavioral question"),
        answer: z.string().describe("How to answer the behavioral question, what points to cover in the answer, and what is the appropriate answer to the behavioral question")
    })).describe("The behavioral questions that may be asked in the interview along their intention and answer"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z.enum(["low","medium","high"]).describe("The severity of the skill gap")
    })).describe("List of skill gaps that the candidate has"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number of the preparation plan"),
        focus: z.string().describe("The focus of the preparation plan for the day"),
        tasks: z.array(z.string().describe("The tasks that the candidate should do to prepare for the interview on the day"))
    })).describe("A day-wise preparation plan for the candidate to prepare for the interview  ")
});


export async function generateInterviewReport({resume ,selfDescription, jobDescription }){

    const prompt = `You are an expert interview coach. You have to generate an interview report for a candidate based on the resume, self description and job description provided.
    Resume: ${resume} Self Description: ${selfDescription} job Description: ${jobDescription}
    `
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            responsejsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log(JSON.parse(response.text))

}

