import {useStateContext} from "../../../context/ContextProvider.jsx";
import { Link, Navigate, Outlet } from 'react-router-dom'
import {DASHBOARD_URL_NAVIGATE} from "../../../../config.js";
export const GestLayout = () => {
    const {token} = useStateContext();
    console.log("Use Token", token)
    if (token){
        return <Navigate to={DASHBOARD_URL_NAVIGATE} />
    }
    return (
        <>
            <Outlet />
        </>
    )
}