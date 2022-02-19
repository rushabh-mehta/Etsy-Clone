import React from 'react';
import {useState} from 'react';
import api from '../services/posts';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/signup.css';

const Signup = () => {
    const [userRegistration, setUserRegistration] = useState({
        username:"",
        useremail:"",
        userpassword:"",
        userconfirmpassword:""
    })

    const [errors, setErrors] = useState({});

    const handleUserRegistration = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({...userRegistration,[name]:value});
    }

    const validateUserRegistration = ()=>{
        let errors = {}
        if(!userRegistration.username.trim()){
            errors.username = "Username required";
        }
        if(!userRegistration.useremail.trim()){
            errors.useremail = "Email required";
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userRegistration.useremail)){
            errors.useremail = "Email address is invalid";
        }
        if(!userRegistration.userpassword.trim()){
            errors.userpassword = "Password required";
        }
        if(!userRegistration.userconfirmpassword.trim()){
            errors.userconfirmpassword = "Password required";
        }else if(userRegistration.userconfirmpassword!==userRegistration.userpassword){
            errors.userconfirmpassword = "Passwords do not match";
        }
        return errors;
    }

    const registerUser = async ()=>{
        // make AXIOS api call
        const response = await api.post('/api/signup/',userRegistration);
        console.log(response);
    }

    const handleUserRegistrationSubmit = (e)=>{
        e.preventDefault();
        setErrors(validateUserRegistration());
        registerUser();
    }

  return (
    <div>
        <form action="" onSubmit={handleUserRegistrationSubmit}>
            <div className="container signup__container">
                <h1 className="signup__header">Sign Up</h1>
                <div className="signup__item form-group">
                    <label htmlFor="username">Name</label>
                    <input className="form-control" id="username" name="username" type="text" value={userRegistration.username} onChange={handleUserRegistration}></input>
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="signup__item form-group">
                    <label htmlFor="useremail">Email</label>
                    <input className="form-control" id="useremail" name="useremail" type="text" value={userRegistration.useremail} onChange={handleUserRegistration}></input>
                    {errors.useremail && <p className="error">{errors.useremail}</p>}
                </div>
                <div className="signup__item form-group">
                    <label htmlFor="userpassword">Password</label>
                    <input className="form-control" id="userpassword" name="userpassword" type="password" value={userRegistration.userpassword} onChange={handleUserRegistration}></input>
                    {errors.userpassword && <p className="error">{errors.userpassword}</p>}
                </div>
                <div className="signup__item form-group">
                    <label htmlFor="userconfirmpassword">Confirm Password</label>
                    <input className="form-control" id="userconfirmpassword" name="userconfirmpassword" type="password" value={userRegistration.userconfirmpassword} onChange={handleUserRegistration}></input>
                    {errors.userconfirmpassword && <p className="error">{errors.userconfirmpassword}</p>}
                </div>
                <div className="signup_item form-group">
                    <button  className="btn btn-primary" type="submit">Sign Up</button>
                </div>
            </div>
            
        </form>
    </div>
  )
}

export default Signup