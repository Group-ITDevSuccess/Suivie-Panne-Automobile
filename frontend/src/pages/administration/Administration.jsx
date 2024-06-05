import 'react-tabulator/lib/css/tabulator_simple.min.css';
import { ReactTabulator } from 'react-tabulator';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.jsx";
import { API_GET_ALL_USER } from "../../../config.js";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/Spinner";

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
            title: "Niveau d'Accès", cssClass: "bg-warning text-center", columns: [
                { title: "Autoriser", field: "authoriser", hozAlign: "center", formatter: "tickCross" },
                { title: "Staff", field: "is_staff", hozAlign: "center", formatter: "tickCross" },
                { title: "Administrateur", field: "is_superuser",  hozAlign: "center", formatter: "tickCross" },
                { title: "Active", field: "is_actif", hozAlign: "center", formatter: "tickCross" },
            ]
        }
    ];

    const { isLoading, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: () => axiosClient.get(API_GET_ALL_USER).then(({ data }) => {
            return data.users;
        }).catch((err) => {
            toast.error("Erreur de récupération de la base !");
            return [];
        })
    });

    if (error) {
        toast.error(error.message);
        return <p>Erreur de récupération de la base !</p>;
    }

    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    {isLoading ? (
                        <div className="d-flex justify-content-center mt-3">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden"></span>
                            </Spinner>
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
