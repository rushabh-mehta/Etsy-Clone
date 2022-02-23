import React from 'react';
import MainNavbar from './MainNavbar';
import {useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container, NavDropdown, InputGroup, FormControl, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/viewprofile.css';
import authapi from '../services/authpost';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const GET_USER_API = '/api/user/';
const GET_COUNTRY_API = '/api/country/';

const EditProfile = () => {
    //    const [gender, setGender] = useState(JSON.parse(localStorage.getItem("user")));
    //    const [country, setCountry] = useState(JSON.parse(localStorage.getItem("user")));
    //    const [birthday, setBirthday] = useState('');
    //    const [about, setAbout] = useState('');
    
    const [user, setUser] = useState();

    const [name, setName] = useState();
    const [validName, setValidName] = useState();
    const [nameFocus, setNameFocus] = useState();

    const [email, setEmail] = useState();
    const [validEmail, setValidEmail] = useState();
    const [emailFocus, setEmailFocus] = useState();

    const [phone, setPhone] = useState();
    const [validPhone, setValidPhone] = useState();
    const [phoneFocus, setPhoneFocus] = useState();

    const [city, setCity] = useState();
    const [validCity, setValidCity] = useState();
    const [cityFocus, setCityFocus] = useState();

    const [address, setAddress] = useState();
    const [validAddress, setValidAddress] = useState();
    const [addressFocus, setAddressFocus] = useState();

    const [dob, setDob] = useState();
    const [validDob, setValidDob] = useState();
    const [dobFocus, setDobFocus] = useState();

    const[editProfileLoading, setEditProfileLoading] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    const getCountries = async () => {
        try{
            const response = await authapi.get(GET_COUNTRY_API);
            if(response && response.data && response.data.success && response.data.countries){
                setCountries(response.data.countries);
            }else{
                setError("Some unexpected error occurred!");
            }
        }catch(e){
            console.log(e);
            setError("Some unexpected error occurred!");
        }
    }

    const getUser = async ({id})=>{
        try{
            const response = await authapi.get(GET_USER_API+id);
            if(response && response.data && response.data.success && response.data.user){
                setUser(response.data.user);
                setEditProfileLoading(false);
            }else{
                setError("Some unexpected error occurred!");
                setEditProfileLoading(false);    
            }
        }catch(e){
            console.log(e);
            setError("Some unexpected error occurred!");
            setEditProfileLoading(false);
        }
    }

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
        <div>Edit Profile</div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">Profile Picture</div>
                <div className="col-md-12">
                   <label htmlFor="username" className="editprofile_item_label">Name</label>
                        {validName && <FontAwesomeIcon icon={faCheck}/> }
                        {(!validName && name) && <FontAwesomeIcon icon={faTimes} />}
                        <input className="form-control editprofile_item_input" id="username" name="username" type="text" onChange={(e)=>{setName(e.target.value)}} onFocus={() => setNameFocus(true)} 
                        onBlur={() => setNameFocus(false)}>
                        </input>
                        {nameFocus && !validName && 
                            <small className="form-text text-muted editprofile_item_text_container">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <span className="editprofile_item_text">Invalid Name</span>
                            </small>
                        }
                </div>
                <div className="col-md-12">
                   <label htmlFor="useremail" className="editprofile_item_label">Email</label>
                        {validEmail && <FontAwesomeIcon icon={faCheck}/> }
                        {(!validEmail && email) && <FontAwesomeIcon icon={faTimes} />}
                        <input className="form-control editprofile_item_input" id="useremail" name="useremail" type="text" onChange={(e)=>{setEmail(e.target.value)}} onFocus={() => setEmailFocus(true)} 
                        onBlur={() => setEmailFocus(false)}>
                        </input>
                        {emailFocus && !validEmail && 
                            <small className="form-text text-muted editprofile_item_text_container">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <span className="editprofile_item_text">Invalid Email</span>
                            </small>
                        }
                </div> 
                <div className="col-md-12">
                    <div>Gender</div>
                    <Form.Check type="radio" name="gender" id="gender" label="Male" />
                    <Form.Check type="radio" name="gender" id="gender" label="Female" />
                </div>
                <div className="col-md-12">
                    <div>Date of Birth</div>
                    <DatePicker selected={dob} onChange={(date) => setDob(date)} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="userphone" className="editprofile_item_label">Phone</label>
                        {validPhone && <FontAwesomeIcon icon={faCheck}/> }
                        {(!validPhone && phone) && <FontAwesomeIcon icon={faTimes} />}
                        <input className="form-control editprofile_item_input" id="userphone" name="userphone" type="text" onChange={(e)=>{setPhone(e.target.value)}} onFocus={() => setPhoneFocus(true)} 
                        onBlur={() => setPhoneFocus(false)}>
                        </input>
                        {emailFocus && !validEmail && 
                            <small className="form-text text-muted editprofile_item_text_container">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <span className="editprofile_item_text">Invalid Phone</span>
                            </small>
                        }
                </div>
               <div className="col-md-12">
                    <label htmlFor="useraddress" className="editprofile_item_label">Address</label>
                    {validAddress && <FontAwesomeIcon icon={faCheck}/> }
                    {(!validAddress && address) && <FontAwesomeIcon icon={faTimes} />}
                    <input className="form-control editprofile_item_input" id="useraddress" name="useraddress" type="text" onChange={(e)=>{setAddress(e.target.value)}} onFocus={() => setAddressFocus(true)} 
                    onBlur={() => setAddressFocus(false)}>
                    </input>
                    {addressFocus && !validAddress && 
                        <small className="form-text text-muted editprofile_item_text_container">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="editprofile_item_text">Invalid Address</span>
                        </small>
                    }
               </div>
               <div className="col-md-12">
                   <label htmlFor="usercity" className="editprofile_item_label">City</label>
                    {validCity && <FontAwesomeIcon icon={faCheck}/> }
                    {(!validCity && city) && <FontAwesomeIcon icon={faTimes} />}
                    <input className="form-control editprofile_item_input" id="usercity" name="usercity" type="text" onChange={(e)=>{setCity(e.target.value)}} onFocus={() => setCityFocus(true)} 
                    onBlur={() => setCityFocus(false)}>
                    </input>
                    {cityFocus && !validCity && 
                        <small className="form-text text-muted editprofile_item_text_container">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="editprofile_item_text">Invalid City</span>
                        </small>
                    }
               </div>
               <div className="col-md-12">
                   <DropdownButton
                    variant="outline-secondary"
                    title="Country"
                    id="input-group-dropdown-1"
                    >
                    {
                       countries.map((country,index)=>{
                            return <Dropdown.Item key={index}>{country.name}</Dropdown.Item>
                        })
                    }
                    </DropdownButton>
               </div>
            </div>
        </div>
        <div>
            <button className="btn btn-primary">Save</button>
        </div>
    </div>
  )
}

export default EditProfile