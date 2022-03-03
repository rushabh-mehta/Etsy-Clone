import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link, Navigate, useNavigate} from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, InputGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle, faMagnifyingGlass, faCartShopping, faUser, faHeart, faShop} from "@fortawesome/free-solid-svg-icons";
import authapi from '../services/authpost';

const USER_SHOP_API = "api/shop/user/";
const CART_PAGE = "/cart";
const LOGIN_PAGE = "/login";
const SHOP_HOME_PAGE = "/shop/home";
const SHOP_CREATE_PAGE = "/shop/create";

const MainNavbar = ({searchQuery, getOtherFilterItems, setSearchQuery})=>{
    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate(LOGIN_PAGE,{replace:true});
    }

    const goToShop = async ()=>{
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user){
            navigate(LOGIN_PAGE, {replace:true});
        }else{
            try{
                const response = await authapi.get(USER_SHOP_API+user.id);
                if(response && response.data){
                    if(response.data.success){
                        if(response.data.shopFound){
                            const shop = response.data.shop;
                            navigate(SHOP_HOME_PAGE);
                        }else{
                            navigate(SHOP_CREATE_PAGE);
                        }
                    }else{
                        console.log(response);
                    }
                }else{
                   console.log(response);
                }
            }catch(err){
                if(err && err.response && err.response.data && err.response.data.error){
                    console.log(err.response.data.error);
                }
            }
        }
    }

    const goToCart = async ()=>{
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user){
            navigate(LOGIN_PAGE, {replace:true});
        }else{
            navigate(CART_PAGE);
        }
    }
    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home">Etsy</Navbar.Brand>
                <InputGroup>
                    <FormControl
                    placeholder="Search.."
                    value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}}
                    />
                    <InputGroup.Text onClick={getOtherFilterItems} id="basic-addon2"><FontAwesomeIcon icon={faMagnifyingGlass}/></InputGroup.Text>
                </InputGroup>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title={<FontAwesomeIcon icon={faUser}/>} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/view-profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/orders">My Orders</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#favorites"><FontAwesomeIcon icon={faHeart}/></Nav.Link>
                    <Nav.Link onClick={goToShop}><FontAwesomeIcon icon={faShop}/></Nav.Link>
                    <Nav.Link onClick={goToCart}><FontAwesomeIcon icon={faCartShopping}/></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar