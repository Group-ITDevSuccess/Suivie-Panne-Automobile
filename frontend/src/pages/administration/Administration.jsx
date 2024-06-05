import 'react-tabulator/lib/css/tabulator_simple.min.css';
import { ReactTabulator } from 'react-tabulator';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.jsx";
import { API_GET_ALL_USER } from "../../../config.js";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Alert } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

export function Administration() {
    const columns = [
        {
            title: "N°",
            formatter: "rownum",
            headerSort: false,
            hozAlign: "center",
            resizable: false,
            width: 50,
            frozen: true
        },
        { title: "Identifiant", field: "username", width: 150 },
        { title: "Nom", field: "first_name", vertAlign: "bottom" },
        { title: "Prénom", field: "last_name", vertAlign: "bottom" },
        { title: "Email", field: "email" },
        {
            title: "Niveau d'Accès", cssClass: "bg-success text-center text-white", columns: [
                { title: "Autoriser", field: "authoriser", cssClass: "bg-secondary text-center text-white", hozAlign: "center", formatter: "tickCross" },
                { title: "Staff", field: "is_staff", cssClass: "bg-secondary text-center text-white", hozAlign: "center", formatter: "tickCross" },
                { title: "Administrateur", field: "is_superuser", cssClass: "bg-secondary text-center text-white", hozAlign: "center", formatter: "tickCross" },
                { title: "Active", field: "is_actif", cssClass: "bg-secondary text-center text-white", hozAlign: "center", formatter: "tickCross" },
            ]
        }
    ];

    const { isLoading, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: () => axiosClient.get(API_GET_ALL_USER).then(({ data }) => {
            console.log(data.users);
            return data.users;
        }).catch((err) => {
            toast.error("Erreur de récupération de la base !");
            return [];
        })
    });

    if (error) {
        toast.error(error.message);
        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Alert variant="danger" className="d-flex align-items-center">
                            <FaExclamationTriangle className="me-2" />
                            Erreur de récupération de la base !
                        </Alert>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
                            <Spinner animation="border" variant="primary" />
                            <span className="ms-2"></span>
                        </div>
                    ) : (
                        <ReactTabulator
                            data={data}
                            columns={columns}
                            layout={"fitColumns"}
                            height={"75vh"}
                            width={"100vw"}
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}
