import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview.api.js";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context.jsx";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    interviewReport,
    setInterviewReport,
    interviewReports,
    setInterviewReports,
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setInterviewReport(response.interviewReport);
    } catch (error) {
      console.error("Error generating interview report:", error);
      throw error; // Rethrow the error to be handled by the caller
    } finally {
      setLoading(false);
    }
    return response?.interviewReport;
  };

  const fetchReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setInterviewReport(response.interviewReport);
    } catch (error) {
      console.error("Error fetching interview report by ID:", error);
      throw error; // Rethrow the error to be handled by the caller
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setInterviewReports(response.interviewReports);
    } catch (error) {
      console.error("Error fetching all interview reports:", error);
      throw error; // Rethrow the error to be handled by the caller
    } finally {
      setLoading(false);
    }
  };

  const fetchResumePdf = async () => {
    setLoading(true);
    let response = null;

    try {
      response = await generateResumePdf(interviewId);
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `interview_report_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating resume pdf:", error);
      throw error;
    } finally {
      setLoading(false);
    }
    return response;
  }

  useEffect(() => {
    const fetchAndSetReport = async (interviewId) => {
      if (interviewId) {
        setLoading(true);
        try {
          await fetchReportById(interviewId);
        } catch (error) {
          console.error("Error fetching interview report by ID:", error);
        } finally {
          setLoading(false);
        }
      }
      else {
        await fetchAllReports();
        
      }
    };
    fetchAndSetReport(interviewId);
  }, [interviewId]);

  return {
    loading,
    interviewReport,
    interviewReports,
    generateReport,
    fetchReportById,
    fetchAllReports,
    fetchResumePdf,
  };
};
