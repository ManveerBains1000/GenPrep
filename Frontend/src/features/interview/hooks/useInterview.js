import {generateInterviewReport,getAllInterviewReports,getInterviewReportById} from "../services/interview.api.js"
import {useContext} from "react"
import {InterviewContext} from "../interview.context.jsx"

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {loading,setLoading,interviewReport,setInterviewReport,interviewReports,setInterviewReports} = context;

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true);
        let response = null
        try {
            response = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
            setInterviewReport(response.interviewReport);   
        } catch (error) {
            console.error("Error generating interview report:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
        finally {
            setLoading(false);
        }
        return response?.interviewReport
    }

    const fetchReportById = async (interviewId) => {
        setLoading(true);
        try {
            const response = await getInterviewReportById(interviewId);
            setInterviewReport(response.interviewReport);
        } catch (error) {
            console.error("Error fetching interview report by ID:", error);
            throw error; // Rethrow the error to be handled by the caller   
        }
        finally {
            setLoading(false);
        }
    }

    const fetchAllReports = async () => {
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setInterviewReports(response.interviewReports);
        } catch (error) {
            console.error("Error fetching all interview reports:", error);
            throw error; // Rethrow the error to be handled by the caller   
        }
        finally {
            setLoading(false);
        }
    }

    return {loading, interviewReport, interviewReports, generateReport, fetchReportById, fetchAllReports};

}
