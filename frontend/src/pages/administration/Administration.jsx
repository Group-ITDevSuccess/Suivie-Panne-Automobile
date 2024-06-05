import 'react-tabulator/lib/css/tabulator_simple.min.css';
import { ReactTabulator } from 'react-tabulator'
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card'

export function Administration() {
    const columns = [
        { title: "Identifiant", field: "username", width: 150, vertAlign:"bottom",hozAlign: "center", },
        { title: "Nom", field: "first_name", vertAlign:"bottom",hozAlign: "center",},
        { title: "Prénom", field: "last_name", vertAlign:"bottom",hozAlign: "center",},
        { title: "Email", field: "email", vertAlign:"bottom",hozAlign: "center",    },
        { title: "Niveau d'Accès", headerCssClass: "center", cssClass: "bg-success text-center text-white", columns: [
            { title: "Autoriser", field: "authoriser",cssClass: "bg-secondary text-center text-white", hozAlign: "center", formatter: "tickCross" },
            { title: "Staff", field: "is_staff", cssClass: "bg-secondary text-center text-white",hozAlign: "center", formatter: "tickCross" },
            { title: "Administrateur", field: "is_superuser",cssClass: "bg-secondary text-center text-white", hozAlign: "center", formatter: "tickCross" },
            { title: "Active", field: "is_actif", cssClass: "bg-secondary text-center text-white",hozAlign: "center", formatter: "tickCross" },
        ]}
    ];
    let data = [

    ];
    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    <ReactTabulator
                     data={data}
                     columns={columns}
                     layout={"fitColumns"}
                     height={"75vh"}
                     width={"100vw"}
                     rowHeader={{
                        formatter: "rownum",
                        headerSort: false,
                        hozAlign: "center",
                        resizable: false,
                        frozen: true
                    }}
                     />
                </Card.Body>
            </Card>
        </Container>
    )
}