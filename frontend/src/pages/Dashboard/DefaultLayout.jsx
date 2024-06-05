import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider.jsx';
import axiosClient from '../../axios-client.jsx';
import { Loader } from '../../shared/Loader.jsx';
import Container from 'react-bootstrap/Container';
import { DASHBOARD_URL_NAVIGATE, LOGIN_URL_NAVIGATE, API_TOKEN_ME } from "../../../config.js";

export function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const payload = {
        token: token
    };
    console.log("TOKEN STO", payload);
    useEffect(() => {
        if (!token) {
            return navigate(LOGIN_URL_NAVIGATE);
        }
        setLoading(true);
        axiosClient.post(API_TOKEN_ME, payload).then(({ data }) => {
            setLoading(false);
            navigate(DASHBOARD_URL_NAVIGATE)
        }).catch(err => {
            setToken(null);
            setUser(null);
            setLoading(false);
            navigate(LOGIN_URL_NAVIGATE);
        });
    }, [token]);

    if (!token) {
        return <Navigate to={LOGIN_URL_NAVIGATE} />;
    }

    return (
        <div id="">
            {
                loading && <Loader />
            }
            {
                !loading &&
                (
                    <Container>
                        <div className='content-body'>
                            <Outlet />
                        </div>
                        <div className="footer">
                            <div className="copyright">
                                <p>Copyright &copy; <Link to={DASHBOARD_URL_NAVIGATE}>SUIVIE PANNE</Link> {new Date(Date.now()).getFullYear()}</p>
                            </div>
                        </div>
                    </Container>
                )
            }
        </div>
    );
}
