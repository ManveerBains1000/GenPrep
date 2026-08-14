import { generateInterviewReport,generateResumePdf } from "../services/ai.service.js";
import { InterviewReport } from "../models/interviewReport.model.js";
import { PDFParse } from "pdf-parse";

/**
 * @Description generate new interview report on the basis of user self description, resume pdf, and job description
 * @Access private
 */
export const generateInterviewReportController = async (req, res) => {
  try {
    const { selfDescription, jobDescription } = req.body;
    const resumeFile = req.file; // Access the uploaded file
    if (!resumeFile) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }
    const resumeContent = await new PDFParse(
      Uint8Array.from(resumeFile.buffer),
    ).getText(); // Extract text from the PDF buffer
    if (!resumeContent) {
      return res.status(400).json({
        message: "Unable to extract text from the resume PDF",
      });
    }
    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await InterviewReport.create({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
      user: req.user.id, // Assuming you have the user ID in the request object after JWT verification
    });

    res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport: interviewReport,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to generate interview report",
    });
  }
};

/**
 * @Description get interview report by interviewId,
 * @Access private
 */
export const getInterviewReportByIdController = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interviewReport = await InterviewReport.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    res.status(200).json({
      message: "Interview report fetched successfully",
      interviewReport: interviewReport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to fetch interview report",
    });
  }
};

/**
 * @Description get all interview reports of the logged in user
 * @Access private
 */
export const getAllInterviewReportsController = async (req, res) => {
  try {
    const interviewReports = await InterviewReport.find({ user: req.user.id })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Interview reports fetched successfully",
      interviewReports: interviewReports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to fetch interview reports",
    });
  }
};


/**
 * @description controller to generate resume pdf from interview report
 * @access private
 */
export const generateResumePdfController = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interviewReport = await InterviewReport.findById(interviewId);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    const {resume,selfDescription,jobDescription} = interviewReport;

    const pdfBuffer = await generateResumePdf({resume,selfDescription,jobDescription});

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=interview_report_${interviewId}.pdf`,
    );
    res.send(pdfBuffer); 

  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to generate resume PDF",
    });
  }
}
 