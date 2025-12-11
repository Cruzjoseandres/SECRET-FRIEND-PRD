import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createParticipante } from "../../../../services/ParticipanteService";

export const useInscripcionForm = () => {
    const navigate = useNavigate();
    const { link } = useParams();

    const [validated, setValidated] = useState(false);
    const [nombre, setNombre] = useState("");
    const [codigoGenerado, setCodigoGenerado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        setError("");

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        setValidated(true);
        setLoading(true);

        try {
            const participante = { nombre };
            const response = await createParticipante(link, participante);
            setCodigoGenerado(response.participante.identificadorUnico);
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                "Error al inscribirte al sorteo. Intenta nuevamente.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/sorteo/${link}`);
    };

    return {
        // Estado
        validated,
        nombre,
        codigoGenerado,
        loading,
        error,

        // Manejadores de estado
        setNombre,

        // Manejadores de eventos
        handleSubmit,
        handleCancel
    };
};
