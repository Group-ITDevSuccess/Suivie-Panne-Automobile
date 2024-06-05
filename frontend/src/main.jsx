import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './style.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Page Home</h1>
    },
    {
        path: '/accounts',
        children: [
            {
                path: '/accounts/login',
                element: <h1>Page Login</h1>
            },
            {
                path: '/accounts/register',
                element: <h1>Page Register</h1>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
