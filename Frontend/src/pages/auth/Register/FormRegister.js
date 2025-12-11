// hooks/useRegisterForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../../services/AuthService";

export const useRegisterForm = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [nombre, setNombre] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        // Limpiar error previo
        setError("");

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        setValidated(true);
        setLoading(true);

        try {
            const registerData = { nombre, username, password };
            await register(registerData);
            navigate("/login");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error al registrar. El usuario podría ya existir.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/login");
    };


    return {
        // Estado
        validated,
        nombre,
        username,
        password,
        loading,
        error,

        // Manejadores de estado
        setNombre,
        setUsername,
        setPassword,

        // Manejadores de eventos
        handleSubmit,
        handleCancel
    };
};
