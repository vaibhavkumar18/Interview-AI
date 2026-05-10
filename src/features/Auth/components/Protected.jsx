import React from 'react'
import { useAuth } from "../hooks/useAuth";
import { Navigate } from 'react-router';
import "../auth.form.scss";


const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    if (loading) {
        return (
            <main className="auth-loading" role="status" aria-live="polite">
                <div className="auth-loading__content">
                    <div className="spinner" aria-hidden="true"></div>
                    <h1 className="auth-loading__title">Loading....</h1>
                </div>
            </main>
        )
    }
    if (!user) {
        return <Navigate to={'/login'} />;
    }

    return children;
}

export default Protected


