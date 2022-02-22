import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, InputGroup, FormControl, } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle, faMagnifyingGlass, faCartShopping, faUser, faHeart} from "@fortawesome/free-solid-svg-icons";

const MainNavbar = ()=>{
    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Etsy</Navbar.Brand>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Search.."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2"><FontAwesomeIcon icon={faMagnifyingGlass}/></InputGroup.Text>
                </InputGroup>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title={<FontAwesomeIcon icon={faUser}/>} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/view-profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#home"><FontAwesomeIcon icon={faHeart}/></Nav.Link>
                    <Nav.Link href="#link"><FontAwesomeIcon icon={faCartShopping}/></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar