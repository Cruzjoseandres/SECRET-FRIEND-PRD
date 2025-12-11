import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthentication from "../../../../hooks/useAuthentication";
import { createSorteo, getSorteoById, updateSorteo } from "../../../../services/SorteoService";

export const useSorteoForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isCheckingAuth, isAuthenticated } = useAuthentication(true);

    const [validated, setValidated] = useState(false);
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(!!id); // Solo si estamos editando
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        // Esperar auth antes de cargar datos
        if (isCheckingAuth) return;
        if (!isAuthenticated) return;

        const fetchSorteo = () => {
            setLoadingData(true);
            getSorteoById(id)
                .then((sorteo) => {
                    setNombre(sorteo.nombre || "");
                    const fechaFormateada = sorteo.fecha
                        ? new Date(sorteo.fecha).toISOString().split('T')[0]
                        : "";
                    setFecha(fechaFormateada);
                })
                .catch((err) => {
                    setError(err.response?.data?.message || "Error al cargar el sorteo");
                })
                .finally(() => {
                    setLoadingData(false);
                });
        };
        fetchSorteo();
    }, [id, isCheckingAuth, isAuthenticated]);

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

        const sorteo = { nombre, fecha };

        try {
            if (id) {
                await updateSorteo(id, sorteo);
            } else {
                await createSorteo(sorteo);
            }
            navigate("/");
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                (id ? "Error al actualizar el sorteo" : "Error al crear el sorteo");
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return {
        // Estado
        validated,
        nombre,
        fecha,
        loading,
        loadingData: loadingData || isCheckingAuth,
        error,
        isEditing: !!id,

        // Manejadores de estado
        setNombre,
        setFecha,

        // Manejadores de eventos
        handleSubmit,
        handleCancel
    };
};
