import React from 'react';
import MainNavbar from './MainNavbar';
import {useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCamera } from "@fortawesome/free-solid-svg-icons";
import LoadingIcons from 'react-loading-icons';
import authapi from '../services/authpost';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/viewprofile.css';

const GET_USER_API = '/api/user/';
const GET_COUNTRY_API = '/api/country/';


const ViewProfile = () => {

    const getUser = async ({id})=>{
        setViewProfileLoading(true);
        try{
            const response = await authapi.get(GET_USER_API+id);
            if(response && response.data && response.data.success && response.data.user){
                let date = new Date(response.data.user.dob);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();
                if (dt < 10) {
                dt = '0' + dt;
                }
                if (month < 10) {
                month = '0' + month;
                }
                response.data.user.dob = month+"/"+dt+"/"+year;
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

    const getCountries = async () => {
        setGettingCountries(true);
        try{
            const response = await authapi.get(GET_COUNTRY_API);
            if(response && response.data && response.data.success && response.data.countries){
                setCountries(response.data.countries);
                setGettingCountries(false);
            }else{
                setError("Some unexpected error occurred!");
                setGettingCountries(false);
            }
        }catch(e){
            console.log(e);
            setError("Some unexpected error occurred!");
            setGettingCountries(false);
        }
    }

    const [countries, setCountries] = useState([]);
    const [user, setUser] = useState("");
    const [error, setError] = useState(false);
    const [viewProfileLoading, setViewProfileLoading] = useState(true);
    const [gettingCountries, setGettingCountries] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user){
            navigate("/login", {replace:true});
        }else{
            getUser(user);
            getCountries();
        }
    },[]);

  return (
    <div>
        <MainNavbar />
        {!gettingCountries && !viewProfileLoading && <div>
            <div><span className="view_profile_header">View Profile</span></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-sm-12">
                        <div><img className="profile_picture"></img></div>
                        <div><FontAwesomeIcon icon={faCamera}/></div>
                    </div>
                    <div className="viewprofile_username col-md-8 col-sm-12">
                        <div>{user && user.name}</div>
                        <div className="row">
                            <div className="viewprofile_useremail col-md-12 col-sm-12">
                                {user && user.email}
                            </div>
                            <div className="viewprofile_usergendercountry col-md-12 col-sm-12">
                                {user && user.gender}, {countries.filter((eachCountry)=>{return user.country===parseInt(eachCountry.id)}) && countries.filter((eachCountry)=>{return user.country===parseInt(eachCountry.id)})[0] && countries.filter((eachCountry)=>{return user.country===parseInt(eachCountry.id)})[0].name}
                            </div>
                            <div className="viewprofile_userdob col-md-12 col-sm-12">
                                {user && <p>Birthdate: {user.dob}</p>}
                            </div>
                            <div className="viewprofile_userphone col-md-12 col-sm-12">
                                 {user && <p>Phone: {user.phone}</p>}
                            </div>
                            <div className="viewprofile_useraddress col-md-12 col-sm-12">
                                {user && user.address}
                            </div>
                            <div className="viewprofile_usercity col-md-12 col-sm-12">
                                {user && user.city}
                            </div>
                            <div className="viewprofile_userabout col-md-12 col-sm-12">
                                <p>{user && user.about}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-12">
                        <Link to="/edit-profile"><FontAwesomeIcon className="edit_icon" icon={faPen}/></Link>
                    </div>
                </div>
            </div>
        </div>}
        {viewProfileLoading && <span><LoadingIcons.ThreeDots height="5px" width="30px" stroke="black" fill="black"/></span>}
    </div>
  )
}

export default ViewProfile