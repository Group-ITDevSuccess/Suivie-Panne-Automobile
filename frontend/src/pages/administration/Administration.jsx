import 'react-tabulator/lib/css/tabulator_simple.min.css';
import { ReactTabulator } from 'react-tabulator'
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card'

export function Administration() {
    const columns = [
      { title: "Name", field: "name", width: 150 },
      { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
      { title: "Favourite Color", field: "col" },
      { title: "Date Of Birth", field: "dob", hozAlign: "center" },
      { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
      { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
    ];
    let data = [
      {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
      {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
      {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
      {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
      {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
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
                     />
                </Card.Body>
            </Card>
        </Container>
    )
}