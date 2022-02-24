import React from 'react';
import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import MainNavbar from './MainNavbar';

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
    <div>
      <MainNavbar />
      <div>Home</div>
    </div>
  )
}

export default Home