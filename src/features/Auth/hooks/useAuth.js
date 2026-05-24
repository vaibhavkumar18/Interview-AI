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
      // mark client as logged-in so we can avoid unnecessary getMe calls
      try {
        localStorage.setItem("isLoggedIn", "true");
      } catch (e) {
        /* ignore storage errors */
        console.error("LocalStorage error:", e);
      }
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
      try {
        localStorage.setItem("isLoggedIn", "true");
      } catch (e) {
        /* ignore storage errors */
        console.error("LocalStorage error:", e);
      }
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      try {
        localStorage.setItem("isLoggedIn", "false");
      } catch (e) {
        console.error("LocalStorage error:", e);
        /* ignore storage errors */
      }
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // If user already present in context, skip backend call
    if (user) {
      setLoading(false);
      return;
    }

    // Check a simple isLoggedIn flag to avoid recursive getMe calls when the user is known signed out
    let isLoggedIn = false;
    try {
      isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    } catch (e) {
      // ignore storage errors and fall through to backend call
      console.error("LocalStorage error:", e);
    }

    if (!isLoggedIn) {
      // No client-side indication of a session — don't call backend repeatedly
      setUser(null);
      setLoading(false);
      return;
    }

    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
        try {
          localStorage.setItem("isLoggedIn", "true");
        } catch (e) {
          console.error("LocalStorage error:", e);
        }
      } catch (error) {
        console.error("Get user error:", error);
        setUser(null);
        try {
          localStorage.setItem("isLoggedIn", "false");
        } catch (e) {
          console.error("LocalStorage error:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [user, setUser, setLoading]);
  return { user, loading, handleLogin, handleRegister, handleLogout };
};
