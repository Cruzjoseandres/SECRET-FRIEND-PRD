// hooks/useLoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../../../hooks/useAuthentication";

export const useLoginForm = () => {
    const navigate = useNavigate();
    const { doLogin, isLoggingIn } = useAuthentication(false);

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Renombrado a 'handleSubmit' para ser más genérico
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        // Limpiar error previo
        setError("");

        // Si el formulario no es válido, solo muestra errores y detente
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        // Si es válido, marca como validado y envía
        setValidated(true);

        const loginData = { username, password };
        const result = await doLogin(loginData);

        if (!result.success) {
            setError(result.error);
        }
    };

    const handleCancel = () => {
        navigate("/register");
    };

    // El hook devuelve "props" y "handlers" que la vista necesita
    return {
        // Estado
        validated,
        username,
        password,
        loading: isLoggingIn,
        error,

        // Manejadores de estado
        setUsername,
        setPassword,

        // Manejadores de eventos
        handleSubmit,
        handleCancel
    };
};
