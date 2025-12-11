import { Alert, Button, Card, Col, Container, Form, FormControl, FormGroup, Row, Spinner } from "react-bootstrap";
import RequiredLabel from "../../../components/RequiredLabel";
import Header from "../../../components/Header";
import { useLoginForm } from "./FormLogin";

const FormLogin = () => {
    const {
        validated,
        username,
        password,
        loading,
        error,
        setUsername,
        setPassword,
        handleSubmit,
        handleCancel
    } = useLoginForm();

    return (
        <>
            <Header />
            <Container>
                <Row className="mt-2">
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <h1>Iniciar sesión</h1>

                                            {error && (
                                                <Alert variant="danger" dismissible onClose={() => { }}>
                                                    {error}
                                                </Alert>
                                            )}

                                            <FormGroup>
                                                <RequiredLabel htmlFor="txtUsername">Username</RequiredLabel>
                                                <FormControl
                                                    id="txtUsername"
                                                    required
                                                    maxLength={100}
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    disabled={loading}
                                                />
                                                <FormControl.Feedback type="invalid">El username es obligatorio</FormControl.Feedback>
                                            </FormGroup>
                                            <FormGroup>
                                                <RequiredLabel htmlFor="txtPassword">Password</RequiredLabel>
                                                <FormControl
                                                    id="txtPassword"
                                                    maxLength={100}
                                                    required
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    disabled={loading}
                                                />
                                                <FormControl.Feedback type="invalid">El password es obligatorio</FormControl.Feedback>
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
                                                    Iniciando...
                                                </>
                                            ) : (
                                                "Iniciar sesión"
                                            )}
                                        </Button>
                                        <Button variant="secondary" className="ms-2" onClick={handleCancel} disabled={loading}>
                                            Registrarse
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
}

export default FormLogin;
