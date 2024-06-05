import {useStateContext} from "../../../context/ContextProvider.jsx";
import { Link, Navigate, Outlet } from 'react-router-dom'
export const GestLayout = () => {
    const {token} = useStateContext();
    if (token){
        return <Navigate to="/" />
    }

    return (
        <>
            <Outlet />
        </>
    )
}