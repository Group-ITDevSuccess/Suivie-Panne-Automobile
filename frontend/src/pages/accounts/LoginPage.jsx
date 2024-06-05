import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../assets/accounts/style.css';
import { LoginForm } from './components/LoginForm.jsx';
import Stack from 'react-bootstrap/Stack';
import axiosClient from '../../axios-client.jsx';
import { toast } from 'react-hot-toast';
import { useStateContext } from '../../context/ContextProvider.jsx';
import { API_LOGIN, DASHBOARD_URL_NAVIGATE } from "../../../config.js";

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useStateContext();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);
  const [unAuthorised, setUnAuthorised] = useState(null);

  const onSubmit = (e) => {
    console.log("Executed the Submit !");
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    setTimeout(() => {
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };

        axiosClient.post(API_LOGIN, payload).then(({ data }) => {
            console.log("Response Data: ", data);
            setUser(data.user);
            setToken(data.token);
            setErrors(null);
            setUnAuthorised(null);
            setLoading(false);
            toast.success(`Heureux de vous revoir !`);
            navigate(DASHBOARD_URL_NAVIGATE);
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            } else if(response && response.status === 401) {
                setUnAuthorised(response.data.error);
            }
            toast.error("Une erreur !");
            setLoading(false);
        });
    }, 2000);
  };

  return (
    <>
      <Container className="ftco-section">
        <Row className="row justify-content-center">
          <Col className="col-md-6 text-center mb-5">
            <h4 className="heading-section">Connexion Suivie</h4>
          </Col>
        </Row>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <Stack className="login-wrap p-4 p-md-5 shadow">
              <div className="icon d-flex align-items-center justify-content-center bg-white text-success">
                <div className="div-logo">
                  <img
                    src="/inviso-group.png"
                    style={{
                      maxWidth: "120px",
                      border: "1px solid #138808",
                      borderRadius: "100%",
                      width: "80px",
                      height: "80px",
                      WebkitAnimationName: "bounce",
                      WebkitAnimationDuration: "0.7s",
                      WebkitAnimationDirection: "alternate",
                      WebkitAnimationTimingFunction: "cubic-bezier(.5, 0.05, 1, .5)",
                      WebkitAnimationIterationCount: "infinite",
                    }}
                    alt="Logo"
                  />
                </div>
              </div>
              <LoginForm onSubmit={onSubmit} usernameRef={usernameRef} passwordRef={passwordRef} />
            </Stack>
          </div>
        </div>
      </Container>
    </>
  );
}
