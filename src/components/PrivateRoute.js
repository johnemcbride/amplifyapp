import React, { FC, useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';

export function PrivateRoute({ children }) {
    const navigate = useNavigate();

    Auth.currentAuthenticatedUser()

        .catch(error => {
            console.log('not loggedin')
            return navigate("/signin")
        })

    return <>{children}</>;
};