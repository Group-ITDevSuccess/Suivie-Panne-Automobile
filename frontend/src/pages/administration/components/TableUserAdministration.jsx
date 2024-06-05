import {ReactTabulator} from "react-tabulator";

export function TableUserAdministration() {
    return (
        <ReactTabulator
            data={data}
            columns={columns}
            layout={"fitColumns"}
            height={"75vh"}
            width={"100vw"}
        />
    )
}