import React from 'react';
import MainNavbar from './MainNavbar';
import {useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCamera } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/viewprofile.css';
import authapi from '../services/authpost';


const EditProfile = () => {
//    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

//    const [name, setName] = useState(JSON.parse(localStorage.getItem("user")));
//    const [gender, setGender] = useState(JSON.parse(localStorage.getItem("user")));
//    const [country, setCountry] = useState(JSON.parse(localStorage.getItem("user")));
//    const [birthday, setBirthday] = useState('');
//    const [about, setAbout] = useState('');
   
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
        <div className="container">
            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <img className="profile_picture"></img>
                    <FontAwesomeIcon icon={faCamera}/>
                </div>
                <div className="col-md-2 col-sm-12">
                    <Link to="/edit-profile"><FontAwesomeIcon icon={faPen}/></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProfile