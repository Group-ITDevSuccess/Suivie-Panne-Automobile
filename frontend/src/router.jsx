import {Navigate, createBrowserRouter} from "react-router-dom";
import {LoginPage} from "./pages/accounts/LoginPage.jsx";
import React from "react";
import {GestLayout} from "./pages/accounts/GestLayout.jsx";
import NotFound from "./shared/NotFound.jsx";
import {DefaultLayout} from "./pages/Dashboard/DefaultLayout.jsx";
import {DASHBOARD_URL_NAVIGATE, LOGIN_URL_NAVIGATE, REGISTER_URL_NAVIGATE} from "../config.js";
import {Dashboard} from "./pages/Dashboard/Dashboard.jsx";

const router = createBrowserRouter([
    {
        element: <GestLayout/>,
        children: [
            {
                path: LOGIN_URL_NAVIGATE,
                element: <LoginPage />
            },
            {
                path: REGISTER_URL_NAVIGATE,
                element: <h1>Page Register</h1>
            }
        ]
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={DASHBOARD_URL_NAVIGATE} />
            },
            {
                path: DASHBOARD_URL_NAVIGATE,
                element: <Dashboard />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
