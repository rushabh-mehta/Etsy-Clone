import React from 'react';
import {useState, useRef, useEffect} from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from '../services/post';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/signup.css';
import LoadingIcons from 'react-loading-icons';
import {useNavigate, useLocation} from "react-router-dom";
import {Link} from 'react-router-dom';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LOGIN_API = '/api/login/';
const HOMEPAGE = "/";
const REGISTER_URL = "/register";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(token && user){
            navigate(HOMEPAGE, {replace:true});
        }
    },[]);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(()=>{
        setValidEmail(EMAIL_REGEX.test(email));
    },[email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setErrorMsg('');
    }, [email, password])

    const loginUser = async ()=>{
        // make AXIOS api call
        setLoggingIn(true);
        const user = {email,password};
        try{
            const response = await api.post(LOGIN_API,user);
            if(response && response.data){
                if(response.data.success){
                    const user = response.data.user;
                    if(user && user.token){
                        const token = user.token;
                        localStorage.setItem("token",token);
                        delete user.token;
                        localStorage.setItem("user",JSON.stringify(user));
                        setLoggingIn(false);
                        setSuccess(true);
                        navigate(HOMEPAGE, {replace:true});
                    }
                }else{
                    setSuccess(false);
                    setErrorMsg("Some unexpected error occurred!");
                    setLoggingIn(false);
                }
            }else{
                setSuccess(false);
                setErrorMsg("Some unexpected error occurred!");
                setLoggingIn(false);
            }
        }catch(err){
            setSuccess(false);
            if(err && err.response && err.response.data && err.response.data.error){
                setErrorMsg(err.response.data.error);
            }
            setLoggingIn(false);
        }
    }
    
    
    const handleUserLoginSubmit = (e)=>{
        e.preventDefault();
        loginUser();
    }

    return (
        <section>
            <h1 className="signup__header">Login</h1>
            <form action="" onSubmit={handleUserLoginSubmit}>
                <div className="container signup__container">
                    <div className="signup__item form-group">
                        <label htmlFor="useremail">Email</label>
                        {validEmail && <FontAwesomeIcon icon={faCheck}/> }
                        {(!validEmail && email) && <FontAwesomeIcon icon={faTimes} />}
                        <input ref={emailRef} className="form-control" id="useremail" name="useremail" type="text" onChange={(e)=>{setEmail(e.target.value)}} onFocus={() => setEmailFocus(true)} 
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
                    <div className="signup_item form-group">
                        <button  className="btn btn-primary" type="submit" disabled={!validEmail || !validPassword|| loggingIn}>Login</button>
                        {loggingIn && <LoadingIcons.ThreeDots stroke="#98ff98" fill="#98ff98"/>}
                        {errorMsg && <p className="error">{errorMsg}</p>}
                        <p><Link to={REGISTER_URL}>Dont have an account? Register here!</Link></p>
                    </div>
                </div>
            </form>
        </section>
    )
   
}

export default Login