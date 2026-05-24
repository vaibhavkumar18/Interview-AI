import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [interviewReport, setInterviewReport] = useState(null);
    const [interviewReports, setInterviewReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading your interview report...');

    return (
        <InterviewContext.Provider value={{ loading, setLoading, loadingMessage, setLoadingMessage, interviewReport, setInterviewReport, interviewReports, setInterviewReports }}>
            {children}
        </InterviewContext.Provider>
    )


}