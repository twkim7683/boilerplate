import React, { useEffect } from "react";
//import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from '../_actions/user_action';
export default function f(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck() {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);
            })

        })
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck;
}