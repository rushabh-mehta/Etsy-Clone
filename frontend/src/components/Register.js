import React from 'react';
import {useState, useRef, useEffect} from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate} from 'react-router-dom';
import api from '../services/post';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/signup.css';
import LoadingIcons from 'react-loading-icons';
import {Link} from 'react-router-dom';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_API = '/api/register';
const HOMEPAGE = "/"; 
const LOGIN_URL = "/login";

const Register = () => {
    const nameRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [registering, setRegistering] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(token && user){
            navigate(HOMEPAGE, {replace:true});
        }
    },[]);

    
    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])

    useEffect(()=>{
        setValidEmail(EMAIL_REGEX.test(email));
    },[email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatchPassword(PWD_REGEX.test(matchPassword) && password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMsg('');
    }, [name, email, password, matchPassword])

    const registerUser = async ()=>{
        // make AXIOS api call
        try{
            setRegistering(true);
            const user = {name,email,password};
            const response = await api.post(REGISTER_API,user);
            if(response && response.data){
                if(response.data.success){
                    const user = response.data.user;
                    if(user && user.token){
                        localStorage.setItem("token",user.token);
                        delete user.token;
                        localStorage.setItem("user",JSON.stringify(user));
                        setRegistering(false);
                        setSuccess(true);
                        navigate(HOMEPAGE,{replace:true});
                    }
                }else{
                    // TODO show error message from response
                    setSuccess(false);
                    setErrorMsg("Some unexpected error occurred!");
                    setRegistering(false);
                }
            }else{
                //TODO show unexpected error
                setErrorMsg("Some unexpected error occurred!");
                setRegistering(false);
            }
        }catch(err){
            setSuccess(false);
            if(err && err.response && err.response.data && err.response.data.error){
                setErrorMsg(err.response.data.error);
            }
            setRegistering(false);
        }
    }
    
    
    const handleUserRegistrationSubmit = (e)=>{
        e.preventDefault();
        registerUser();
    }

    return (
        <section>
            <h1 className="signup__header">Register</h1>
            <form action="" onSubmit={handleUserRegistrationSubmit}>
                <div className="container signup__container">
                    <div className="signup__item form-group">
                        <label htmlFor="username">Name</label>
                        {validName && <FontAwesomeIcon icon={faCheck}/> }
                        {(!validName && name) && <FontAwesomeIcon icon={faTimes} />}
                        <input ref={nameRef} className="form-control" id="username" name="username" type="text" onChange={(e)=>{setName(e.target.value)}} onFocus={() => setUserFocus(true)} 
                        onBlur={() => setUserFocus(false)}>
                        </input>
                        {userFocus && !validName && 
                            <p>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        }    
                    </div>
                    <div className="signup__item form-group">
                        <label htmlFor="useremail">Email</label>
                        {validEmail && <FontAwesomeIcon icon={faCheck}/> }
                        {(!validEmail && email) && <FontAwesomeIcon icon={faTimes} />}
                        <input className="form-control" id="useremail" name="useremail" type="text" onChange={(e)=>{setEmail(e.target.value)}} onFocus={() => setEmailFocus(true)} 
                        onBlur={() => setEmailFocus(false)}>
                        </input>
                        {emailFocus && !validEmail && 
                            <p>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Invalid Email
                            </p>
                        }    
                    </div>
                    <div className="signup__item form-group">
                        <label htmlFor="userpassword">Password</label>
                        {validPassword && <FontAwesomeIcon icon={faCheck}/> }
                        {(!validPassword && password) && <FontAwesomeIcon icon={faTimes} />}
                        <input className="form-control" id="userpassword" name="userpassword" type="password" onChange={(e)=>{setPassword(e.target.value)}} onFocus={() => setPasswordFocus(true)} 
                        onBlur={() => setPasswordFocus(false)}>
                        </input>
                        {passwordFocus && !validPassword && 
                            <p>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        }    
                    </div>
                    <div className="signup__item form-group">
                        <label htmlFor="usermatchpassword">Confirm Password</label>
                        {validMatchPassword && <FontAwesomeIcon icon={faCheck}/> }
                        {(!validMatchPassword && matchPassword) && <FontAwesomeIcon icon={faTimes} />}
                        <input className="form-control" id="usermatchpassword" name="usermatchpassword" type="password" onChange={(e)=>{setMatchPassword(e.target.value)}} onFocus={() => setMatchPasswordFocus(true)} 
                        onBlur={() => setMatchPasswordFocus(false)}>
                        </input>
                        {matchPasswordFocus && !validMatchPassword && 
                            <p>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                        }    
                    </div>
                    <div className="signup_item form-group">
                        <button  className="btn btn-primary" type="submit" disabled={!validName || !validEmail || !validPassword || !validMatchPassword || registering}>Register</button>
                        {registering && <LoadingIcons.ThreeDots stroke="#98ff98" fill="#98ff98"/>}
                        {errorMsg && <p className="error">{errorMsg}</p>}
                        <p><Link to={LOGIN_URL}>Already Have an account? Login here!</Link></p>
                    </div>
                </div>
            </form>
        </section>
    )
   
}

export default Register