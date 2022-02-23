import React from 'react';
import MainNavbar from './MainNavbar';
import {useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCamera } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/viewprofile.css';
import authapi from '../services/authpost';

const GET_USER_API = '/api/user/';

const ViewProfile = () => {

    const getUser = async ({id})=>{
        try{
            const response = await authapi.get(GET_USER_API+id);
            if(response && response.data && response.data.success && response.data.user){
                setUser(response.data.user);
                setViewProfileLoading(false);
            }else{
                setError("Some unexpected error occurred!");
                setViewProfileLoading(false);    
            }
        }catch(e){
            console.log(e);
            setError("Some unexpected error occurred!");
            setViewProfileLoading(false);
        }
    }

    
    const [user, setUser] = useState();
    const [error, setError] = useState(false);
    const [viewProfileLoading, setViewProfileLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user){
            navigate("/login", {replace:true});
        }else{
            getUser(user);
        }
    },[]);

  return (
    <div>
        <MainNavbar />
        {!viewProfileLoading && <div>
            <div>View Profile</div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <img className="profile_picture"></img>
                        <FontAwesomeIcon icon={faCamera}/>
                    </div>
                    <div className="col-md-2 col-sm-12">
                        {user && user.name}
                    </div>
                    <div className="col-md-2 col-sm-12">
                        <Link to="/edit-profile"><FontAwesomeIcon icon={faPen}/></Link>
                    </div>
                </div>
            </div>
        </div>}
        {viewProfileLoading && <div>Loading</div>}
    </div>
  )
}

export default ViewProfile