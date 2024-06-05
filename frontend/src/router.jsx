import {Navigate, createBrowserRouter} from "react-router-dom";
import {LoginPage} from "./pages/accounts/LoginPage.jsx";
import React from "react";
import {GestLayout} from "./pages/accounts/components/GestLayout.jsx";
import NotFound from "./shared/NotFound.jsx";
import {DefaultLayout} from "./pages/Dashboard/DefaultLayout.jsx";

const router = createBrowserRouter([
    {
        element: <GestLayout/>,
        children: [
            {
                path: '/accounts/login',
                element: <LoginPage />
            },
            {
                path: '/accounts/register',
                element: <h1>Page Register</h1>
            }
        ]
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/" />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
