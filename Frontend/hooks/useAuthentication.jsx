import { useNavigate } from "react-router-dom";
import { getAccessToken, removeAccessToken, saveAccessToken } from "../utils/TokenUtilities";
import { useEffect, useState } from "react";
import { login } from "../services/AuthService";

const useAuthentication = (checkOnload = false) => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "";
    
    // Estado para saber si estamos verificando la autenticación
    const [isCheckingAuth, setIsCheckingAuth] = useState(checkOnload);
    // Estado para saber si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Estado para el proceso de login
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const validateLogin = () => {
        const token = getAccessToken();
        if (!token) {
            setIsAuthenticated(false);
            setIsCheckingAuth(false);
            navigate("/login");
            return false;
        }
        setIsAuthenticated(true);
        setIsCheckingAuth(false);
        return true;
    }

    const doLogin = (loginData) => {
        setIsLoggingIn(true);
        return login(loginData)
            .then((response) => {
                saveAccessToken(response.token);
                localStorage.setItem("username", loginData.username);
                navigate("/");
                return { success: true };
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Credenciales incorrectas. Verifica tu usuario y contraseña.";
                return { success: false, error: errorMessage };
            })
            .finally(() => {
                setIsLoggingIn(false);
            });
    }

    const doLogout = () => {
        removeAccessToken();
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        navigate("/login");
    }

    useEffect(() => {
        if (!checkOnload) {
            setIsCheckingAuth(false);
            return;
        }
        validateLogin();
        // eslint-disable-next-line
    }, [navigate]);

    return { 
        doLogout, 
        doLogin, 
        username, 
        isCheckingAuth, 
        isAuthenticated,
        isLoggingIn 
    }
}

export default useAuthentication;