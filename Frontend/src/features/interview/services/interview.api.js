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

    const response = await api.get(`/report/${interviewId}`);

    return response.data;
}


/**
 * @description get all interview report of loggedin user
 */
export async function getAllInterviewReports() {
    const response = await api.get("/");

    return response.data;
}