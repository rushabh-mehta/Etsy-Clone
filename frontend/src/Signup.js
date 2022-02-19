import React from 'react';
import {useState} from 'react';

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

    const registerUser = ()=>{
        // make AXIOS api call
    }

    const handleUserRegistrationSubmit = (e)=>{
        e.preventDefault();
        setErrors(validateUserRegistration());
        registerUser();
    }

  return (
    <div>
        <form action="" onSubmit={handleUserRegistrationSubmit}>
            <div>
                <label htmlFor="username">Name</label>
                <input id="username" name="username" type="text" value={userRegistration.username} onChange={handleUserRegistration}></input>
                {errors.username && <p>{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="useremail">Email</label>
                <input id="useremail" name="useremail" type="text" value={userRegistration.useremail} onChange={handleUserRegistration}></input>
                {errors.useremail && <p>{errors.useremail}</p>}
            </div>
            <div>
                <label htmlFor="userpassword">Password</label>
                <input id="userpassword" name="userpassword" type="password" value={userRegistration.userpassword} onChange={handleUserRegistration}></input>
                {errors.userpassword && <p>{errors.userpassword}</p>}
            </div>
            <div>
                <label htmlFor="userconfirmpassword">Confirm Password</label>
                <input id="userconfirmpassword" name="userconfirmpassword" type="password" value={userRegistration.userconfirmpassword} onChange={handleUserRegistration}></input>
                {errors.userconfirmpassword && <p>{errors.userconfirmpassword}</p>}
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default Signup