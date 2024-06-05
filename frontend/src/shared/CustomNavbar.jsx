import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {API_LOGOUT, LOGIN_URL_NAVIGATE} from "../../config.js";
import Button from "react-bootstrap/Button";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.jsx";
import {toast} from "react-hot-toast";

function CustomNavbar() {
    const {setToken, setUser} = useStateContext()
    const navigate = useNavigate()

    const handleLogout = (e) =>{
        e.preventDefault()

        if (!window.confirm('Êtes-vous sûre de vouloir vous déconnecter ?')) {
            return;
        }
        axiosClient.post(API_LOGOUT).then(()=>{
            setToken(null)
            setUser(null)
            navigate(LOGIN_URL_NAVIGATE)
        }).catch(err => {
            const response = err.response
            console.log(response);
            toast.error("Une erreur est survenu lors du déconnnexion")
        })
    }

    return (
    <Navbar className="bg-body-tertiary justify-content-between" bg="light" data-bs-theme="dark">
        <Container fluid>
            <Navbar.Brand href="#home">
                <img
                  alt=""
                  src="/inviso-group.png"
                  width="60"
                  className="d-inline-block align-top text-white mt-0                                                                                                                                                                               "
                />{' '}
                Suivie Panne
              </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Form inline>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Chercher Ici "
                      className="mr-sm-2 text-dark"
                    />
                  </Col>
                  <Col xs="auto mt-1">
                    <Button className={"mr-sm-2"} variant="outline-success" style={{borderRadius: 5}} type={"submit"}>Cherchez</Button>
                    <Link variant="outline-danger" to={API_LOGOUT} className="btn btn-outline-danger" style={{borderRadius: 5}} onClick={handleLogout}>Déconnexion</Link>
                  </Col>
                </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default CustomNavbar;
