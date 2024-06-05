import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import React from "react";

export const LoginForm = ({onSubmit, usernameRef, passwordRef}) => {
    return (
        <Stack>
            <h3 className="text-center mb-4 text-success">Identifiez Vous</h3>
            <Form className="login-form"  onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control ref={usernameRef} type="text" name="username" placeholder="Nom d'utilisateur"/>
                </Form.Group>
                <Form.Group className="mb-3 d-flex">
                    <Form.Control ref={passwordRef} type="password" name="password" placeholder="Mot de passe"/>
                </Form.Group>
                <Form.Group className="mb-3 d-md-flex">
                    <div className="w-100 mb-5">
                        <div className="form-group">
                            <Button type="submit" variant="success" className="rounded submit p-3 px-5">Connexion</Button>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </Stack>
    )
}