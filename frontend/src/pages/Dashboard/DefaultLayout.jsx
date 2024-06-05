import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import {useStateContext} from "../../context/ContextProvider.jsx";
import axiosClient from "../../axios-client.jsx";
import {Loader} from "../../shared/Loader.jsx";

export function DefaultLayout() {
    const {token, setUser, setToken} = useStateContext()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axiosClient.get('token/me/').then(({data})=>{
            console.log(data)
            setLoading(false)
        }).catch(err =>{
            console.log(err)
            setToken(null)
            setUser(null)
            setLoading(false)
            navigate('accounts/login')
        })
    }, []);
    if(!token){
        return <Navigate to="accounts/login" />
    }
    return (
    <div id="">
      {
        loading && <Loader />
      }
        {
          !loading &&
          (
            <>

              <div className='content-body'>
                <Outlet/>
              </div>
              <div className="footer">
                <div className="copyright">
                    <p>Copyright &copy; <Link to="/">SUIVIE PANNE</Link> {new Date(Date.now()).getFullYear()}</p>
                </div>
              </div>
            </>
          )
        }
    </div>
  )
}