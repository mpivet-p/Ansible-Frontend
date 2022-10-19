import React from 'react';
import { Navigate } from 'react-router-dom';
 
function RouteGuard({ children }) {
        return (localStorage.getItem("token") ?
                    children
                    :
                    <Navigate replace to={{ pathname: '/login' }} />
       )
};
 
export default RouteGuard;