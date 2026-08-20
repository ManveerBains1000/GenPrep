import React from "react";
import ReportCard from "../components/ReportCard";
import "../style/InterviewReports.scss";
import { useInterview } from "../hooks/useInterview.js";


const InterviewReports = () => {
  const { interviewReports, loading } = useInterview();
 
  if (loading || !interviewReports) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  console.log("Interview Reports: ", interviewReports);
  return (
    <div className="reports-page">
      <header className="reports-header">
        <h1>Technical Interview Reports</h1>
      </header>

      <div className="reports-divider" />

      <section className="reports-grid" aria-label="Interview reports">
        {interviewReports.map((report) => (
          <ReportCard key={report._id} {...report} reportId={report._id} skills={report.skillGaps}  />
        ))}
      </section>
    </div>
  );
};

export default InterviewReports;
