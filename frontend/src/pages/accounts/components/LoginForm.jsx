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
                <Form.Group className="mb-3 d-flex">
                    <Form.Control ref={passwordRef} type="password" name="password" placeholder="Mot de passe" />
                </Form.Group>
                <Form.Group className="mb-3 d-md-flex">
                    <div className="w-100 mb-5">
                        <div className="form-group">
                            <Button type="submit" variant="success" className="rounded submit p-3 px-5" disabled={loading}>
                                Connexion
                            </Button>
                            {loading && (
                                <div className="d-flex justify-content-center mt-3">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden"></span>
                                    </Spinner>
                                </div>
                            )}
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </Stack>
    );
};
