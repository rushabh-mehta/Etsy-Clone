import React from 'react'
import api from '../services/authpost';
import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
 

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(!token || !user){
            navigate("/login", {replace:true});
        }
    },[]);

  return (
    <div>Home</div>
  )
}

export default Home