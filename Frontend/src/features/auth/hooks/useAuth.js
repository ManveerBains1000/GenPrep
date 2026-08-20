import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../api/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  const didFetch = useRef(false);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    const getAndSetUser = async () => {
      try {
        setLoading(true)
        const response = await getMe();
        setUser(response?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setUser(null)
      }
      finally{
        setLoading(false)
      }
    };
    getAndSetUser();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
