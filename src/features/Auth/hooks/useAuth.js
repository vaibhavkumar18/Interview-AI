import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api.js";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }

    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return true;
        } catch (error) {
            console.error("Register error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            return true;
        } catch (error) {
            console.error("Logout error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
                setLoading(false);
            } catch (error) {
                console.error("Get user error:", error);
                setUser(null);
                setLoading(false);
            }

        }
        getAndSetUser();
    }, [setUser, setLoading]);
    return { user, loading, handleLogin, handleRegister, handleLogout };
}