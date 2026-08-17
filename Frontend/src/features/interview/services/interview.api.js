import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const interviewApi = axios.create({
  baseURL: `${API_BASE_URL}/interview`,
  withCredentials: true,
});



/**
 * @description generate new interview report on the basis of user self description, resume pdf, and job description
 */
export async function generateInterviewReport({jobDescription, selfDescription, resumeFile}) {

    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await interviewApi.post("/",formData,{
        headers: {
            "content-type": "multipart/form-data"
        }
    })

    return response.data;

}


/**
 * @description get interview report by interviewId
 */

export async function getInterviewReportById(interviewId) {

    const response = await interviewApi.get(`/report/${interviewId}`);

    return response.data;
}


/**
 * @description get all interview report of loggedin user
 */
export async function getAllInterviewReports() {
    const response = await interviewApi.get("/");

    return response.data;
}


/**
 * @Description generate resume pdf from interview report
 */

export async function generateResumePdf(interviewId) {
    try{
        const response = await interviewApi.post(
            `/resume/pdf/${interviewId}`,
            null,
            { responseType: 'blob' }
        );
        return response.data; // Blob PDF
    }
    catch(error){
        console.error("Error generating resume pdf:", error);
        throw error;
    }
}