import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";

export const LoginForm = ({ onSubmit, usernameRef, passwordRef, loading }) => {
    return (
        <Stack>
            <h3 className="text-center mb-4 text-success">Identifiez Vous</h3>
            <Form className="login-form" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control ref={usernameRef} type="text" name="username" placeholder="Nom d'utilisateur" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control ref={passwordRef} type="password" name="password" placeholder="Mot de passe" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <div className="w-100">
                        <Button size={"sm"} type="submit" variant="success" className="w-100 rounded submit p-3 px-5" disabled={loading}>
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center">
                                    <Spinner animation="border" role="status" size={"sm"}>
                                        <span className="visually-hidden"></span>
                                    </Spinner>
                                </div>
                            ) : (
                                'Connexion'
                            )}
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </Stack>
    );
};
