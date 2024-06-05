import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom'; // Importez NavLink de react-router-dom
import {ADMINISTRATION_URL_NAVIGATE, API_LOGOUT, DASHBOARD_URL_NAVIGATE, LOGIN_URL_NAVIGATE} from "../../config.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.jsx";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-hot-toast";

function CustomNavbar() {
    const { setToken, setUser } = useStateContext()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()

        confirmAlert({
            title: 'Confirmation',
            message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        axiosClient.post(API_LOGOUT).then(() => {
                            setToken(null)
                            setUser(null)
                            navigate(LOGIN_URL_NAVIGATE)
                        }).catch(err => {
                            const response = err.response
                            toast.error("Une erreur est survenue lors de la déconnexion")
                        })
                    }
                },
                {
                    label: 'Non',
                    onClick: () => {}
                }
            ]
        });
    }

    return (
        <Navbar className="bg-body-tertiary justify-content-between" bg="light" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={NavLink} to={DASHBOARD_URL_NAVIGATE}>
                    <img
                        alt=""
                        src="/inviso-group.png"
                        width="60"
                        className="d-inline-block align-top text-white mt-0"
                    />{' '}
                    Suivi Panne
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to={DASHBOARD_URL_NAVIGATE}>Home</Nav.Link>
                        <Nav.Link as={NavLink} to={ADMINISTRATION_URL_NAVIGATE}>Administration</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Button as={NavLink} className="btn btn-outline-danger" style={{ borderRadius: 5 }} to={API_LOGOUT} onClick={handleLogout}>Déconnexion</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
