import { Alert, Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Spinner } from "react-bootstrap";
import RequiredLabel from "../../../components/RequiredLabel";
import Header from "../../../components/Header";
import { useSorteoForm } from "./SorteoCreate";

const FormSorteo = () => {
    const {
        validated,
        nombre,
        fecha,
        loading,
        loadingData,
        error,
        isEditing,
        setNombre,
        setFecha,
        handleSubmit,
        handleCancel
    } = useSorteoForm();

    // Obtener la fecha mínima (hoy)
    const obtenerFechaMinima = () => {
        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        return `${año}-${mes}-${dia}`;
    };

    // Mostrar carga si estamos cargando datos de un sorteo existente
    if (loadingData) {
        return (
            <>
                <Header />
                <Container className="mt-4">
                    <Row className="justify-content-center">
                        <Col className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </Spinner>
                            <p className="mt-2">Cargando datos...</p>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

    return (
        <>
            <Header />
            <Container>
                <Row className="mt-2">
                    <Col md={9} xl={6}>
                        <Card>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <h1>{isEditing ? "Editar Sorteo" : "Crear Sorteo"}</h1>

                                            {error && (
                                                <Alert variant="danger" dismissible onClose={() => { }}>
                                                    {error}
                                                </Alert>
                                            )}

                                            <FormGroup>
                                                <RequiredLabel htmlFor="txtNombre">Nombre del Sorteo</RequiredLabel>
                                                <FormControl
                                                    id="txtNombre"
                                                    required
                                                    maxLength={100}
                                                    type="text"
                                                    value={nombre}
                                                    onChange={(e) => setNombre(e.target.value)}
                                                    disabled={loading}
                                                />
                                                <FormControl.Feedback type="invalid">
                                                    El nombre es obligatorio
                                                </FormControl.Feedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <FormGroup>
                                                <FormLabel htmlFor="txtFecha">Fecha de Sorteo</FormLabel>
                                                <FormControl
                                                    id="txtFecha"
                                                    type="date"
                                                    min={obtenerFechaMinima()}
                                                    value={fecha}
                                                    onChange={(e) => setFecha(e.target.value)}
                                                    disabled={loading}
                                                />
                                                <Form.Text className="text-muted">
                                                    Selecciona una fecha a partir de hoy
                                                </Form.Text>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <div className="mt-3">
                                        <Button variant="primary" type="submit" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    {isEditing ? "Actualizando..." : "Creando..."}
                                                </>
                                            ) : (
                                                "Guardar"
                                            )}
                                        </Button>
                                        <Button variant="secondary" className="ms-2" onClick={handleCancel} disabled={loading}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormSorteo;
