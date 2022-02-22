import React from 'react';
import MainNavbar from './MainNavbar';
import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const ViewProfile = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(!token || !user){
            navigate("/login", {replace:true});
        }
    },[]);
  return (
    <div>
        <MainNavbar />
        <div>View Profile</div>
    </div>
  )
}

export default ViewProfile