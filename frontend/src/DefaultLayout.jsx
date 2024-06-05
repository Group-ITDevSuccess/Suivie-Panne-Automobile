import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useStateContext } from './context/ContextProvider.jsx';
import axiosClient from './axios-client.jsx';
import { Loader } from './shared/Loader.jsx';
import Container from 'react-bootstrap/Container';
import { DASHBOARD_URL_NAVIGATE, LOGIN_URL_NAVIGATE, API_TOKEN_ME } from "../config.js";
import CustomNavbar from "./shared/CustomNavbar.jsx";
import { Navbar, Nav } from 'react-bootstrap'; // Importer les composants Navbar et Nav de react-bootstrap

export function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return navigate(LOGIN_URL_NAVIGATE);
        }

        setLoading(true);
        axiosClient.post(API_TOKEN_ME, { user }, {
            headers: {
                Authorization: `Token ${token}`
            }
        }).then(({ data }) => {
            setUser(data.user);
            setToken(data.token);
            setLoading(false);
            navigate(DASHBOARD_URL_NAVIGATE);
        }).catch(err => {
            console.log(err.response?.data || err);
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
            {loading && <Loader />}
            {!loading && (
                <div>
                    <CustomNavbar />
                    <div className='content-body'>
                        <Outlet />
                    </div>
                    <Navbar bg="dark" variant="dark" className="footer mt-3 d-flex justify-content-between align-items-center"> {/* Ajoutez les classes d-flex, justify-content-between et align-items-center */}
                        <Container fluid>
                            <div>
                                <p className="text-muted">Inviso Group</p>
                            </div>
                            <div>
                                <p className="text-muted">&copy; {new Date(Date.now()).getFullYear()} SUIVIE PANNE</p>
                            </div>
                        </Container>
                    </Navbar>
                </div>
            )}
        </div>
    );
}
