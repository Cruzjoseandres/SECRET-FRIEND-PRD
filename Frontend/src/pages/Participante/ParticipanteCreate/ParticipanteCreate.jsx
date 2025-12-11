import { Alert, Button, Card, Col, Container, Form, FormControl, FormGroup, Row, Spinner } from "react-bootstrap";
import RequiredLabel from "../../../components/RequiredLabel";
import Header from "../../../components/Header";
import { useInscripcionForm } from "./ParticipanteCreate";
import { useParams } from "react-router-dom";

const FormInscripcion = () => {
    const { link } = useParams();
    const {
        validated,
        nombre,
        setNombre,
        codigoGenerado,
        loading,
        error,
        handleSubmit,
        handleCancel
    } = useInscripcionForm();

    return (
        <>
            <Header />
            <Container>
                <Row className="mt-2">
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                {codigoGenerado ? (
                                    <>
                                        <h2>¡Inscripción exitosa!</h2>
                                        <p>Tu código de acceso es:</p>
                                        <h3 className="text-primary text-center my-4">{codigoGenerado}</h3>
                                        <p className="text-muted">Guarda este código para poder ver tu asignación más tarde.</p>
                                        <Button variant="primary" onClick={() => window.location.href = `/sorteo/${link}`}>
                                            Volver al sorteo
                                        </Button>
                                    </>
                                ) : (
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>
                                            <Col>
                                                <h1>Inscríbete al Sorteo</h1>

                                                {error && (
                                                    <Alert variant="danger" dismissible onClose={() => { }}>
                                                        {error}
                                                    </Alert>
                                                )}

                                                <FormGroup>
                                                    <RequiredLabel htmlFor="txtNombre">Nombre</RequiredLabel>
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
                                        <div className="mt-2">
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
                                                        Inscribiendo...
                                                    </>
                                                ) : (
                                                    "Inscribirse"
                                                )}
                                            </Button>
                                            <Button variant="secondary" className="ms-2" onClick={handleCancel} disabled={loading}>
                                                Cancelar
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FormInscripcion;
