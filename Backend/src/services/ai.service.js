import {GoogleGenAI} from "@google/genai"
import { z } from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema'
import {env} from "../config/env.js"
const ai = new GoogleGenAI({
     apiKey: env.GEMINI_API_KEY
});

export async function invokeGeminiAi(){
    const response = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: "Hello gemini ! Explain what is interview ?"
    })

    console.log("Response content: ",response.output_text)
}

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
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
    })).describe("A day-wise preparation plan for the candidate to prepare for the interview  "),
    title: z.string().describe("The title of the job for which the interview report is generated"),
});


export async function generateInterviewReport({resume ,selfDescription, jobDescription }){

const prompt = `
You are an expert interview coach.

Generate an interview preparation report for the candidate based on:
1. Resume
2. Self description
3. Job description

The output MUST strictly follow the provided response schema.

Do not add any properties that are not present in the schema.
Do not rename any properties.
matchScore must be a number between 0 and 100, not a percentage string.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema)
        }
    })
    return JSON.parse(response.text)
}

