import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../../../hooks/useAuthentication";
import { deleteSorteo, getAllSorteos } from "../../../../services/SorteoService";

export const useListaSorteos = () => {
    const navigate = useNavigate();
    const { isCheckingAuth, isAuthenticated } = useAuthentication(true); // Validar autenticación

    const [listaSorteo, setListaSorteo] = useState([]);
    const [loading, setLoading] = useState(true); // Empezar en true para mostrar carga inicial

    const fetchSorteos = () => {
        setLoading(true);
        getAllSorteos()
            .then((sorteos) => {
                setListaSorteo(sorteos);
            })
            .catch(() => {
                alert("Error al cargar los sorteos");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Solo cargar sorteos cuando la verificación de auth termine Y el usuario esté autenticado
    useEffect(() => {
        if (isCheckingAuth) {
            // Todavía estamos verificando autenticación, no hacer nada
            return;
        }

        if (!isAuthenticated) {
            // No está autenticado, se redirige desde useAuthentication
            setLoading(false);
            return;
        }

        // Autenticado, cargar sorteos
        fetchSorteos();
    }, [isCheckingAuth, isAuthenticated]);

    const handleEdit = (sorteo) => {
        const id = sorteo.id || sorteo.idSorteo;
        navigate(`/sorteo/${id}/editar`);
    };

    const handleView = (link) => {
        navigate(`/sorteo/${link}`);
    };

    const handleDelete = async (sorteo) => {
        if (!window.confirm("¿Eliminar este sorteo?")) return;
        const id = sorteo.id || sorteo.idSorteo;
        try {
            await deleteSorteo(id);
            fetchSorteos();
        } catch (err) {
            console.error("Error al eliminar sorteo:", err);
            alert("No se pudo eliminar el sorteo");
        }
    };

    const handleCreate = () => {
        navigate('/sorteo/create');
    };

    return {
        // Estado
        listaSorteo,
        loading: loading || isCheckingAuth, // Mostrar carga mientras verifica auth O carga sorteos

        // Handlers
        handleEdit,
        handleView,
        handleDelete,
        handleCreate
    };
};
