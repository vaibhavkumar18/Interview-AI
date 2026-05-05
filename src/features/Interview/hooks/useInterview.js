import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePDF } from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    };
    const { loading, setLoading, loadingMessage, setLoadingMessage, interviewReport, setInterviewReport, interviewReports, setInterviewReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        setLoadingMessage('Generating your interview report...');
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setInterviewReport(response.data);

        } catch (error) {
            console.error("Error generating interview report:", error);
        } finally {
            setLoading(false);
            setLoadingMessage('Loading your interview report...');
        }
        return response.data;
    };

    const getReportById = async (interviewId) => {
        setLoading(true);
        setLoadingMessage('Loading your interview report...');
        let response = null;
        try {
            response = await getInterviewReportById(interviewId);
            setInterviewReport(response.data);
        } catch (error) {
            console.error("Error fetching interview report by ID:", error);
        } finally {
            setLoading(false);
            setLoadingMessage('Loading your interview report...');
        }
        return response.data;
    };

    const getAllReports = async () => {
        setLoading(true);
        setLoadingMessage('Loading your interview report...');
        let response = null;
        try {
            response = await getAllInterviewReports();
            setInterviewReports(response.data);
        } catch (error) {
            console.error("Error fetching all interview reports:", error);
        } finally {
            setLoading(false);
            setLoadingMessage('Loading your interview report...');
        }
        return response.data;
    };

    const getResumePDF = async (interviewId) => {
        setLoading(true);
        setLoadingMessage('Preparing your resume PDF for download...');
        let response = null;
        try {
            response = await generateResumePDF(interviewId);
            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume_${interviewId}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error generating resume PDF:", error);
        } finally {
            setLoading(false);
            setLoadingMessage('Loading your interview report...');
        }
    };

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
        else {
            getAllReports();
        }
    }, [interviewId]);

    return {
        loading,
        loadingMessage,
        interviewReport,
        interviewReports,
        generateReport,
        getReportById,
        getAllReports,
        getResumePDF
    }
}