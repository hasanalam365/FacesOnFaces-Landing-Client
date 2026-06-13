import React from 'react'
import useAuth from '../../Hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import PageLoader from '../PrivateRoute/PageLoading'
import useAdmin from "../../Hooks/useAdmin" 

const AdminRoute = ({children}) => {

    const {user,loading,logOut}=useAuth()
    const [isAdmin,isPending]=useAdmin()
    const location=useLocation()


    if(loading || isPending){
        return <PageLoader />
    }

    if(user && isAdmin){
        return children
    }

    if(!isAdmin){
        logOut()
    }


  return <Navigate to={'/login'} state={location?.pathname}></Navigate> 
}

export default AdminRoute
