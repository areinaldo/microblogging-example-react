import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, Media, Row, Col, Container } from 'reactstrap';
import {AiOutlineCopyright} from 'react-icons/ai';
import MyPlaceHolderPicture from '../images/logo.png';
var imgStyle = {
    maxWidth: "85px",
};

class HeaderApp extends Component {
    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <Navbar color ="dark" ligth expand="md">
                            <NavbarBrand><h4 className="text-warning">Mi Aplicacion de Microblogging</h4></NavbarBrand>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://jesusfontecha.name/mern" target="_blank">
                                        <span className="text-white">Desarrollo web full stack con MERN<AiOutlineCopyright /></span>
                                        <Media style={imgStyle} object src={MyPlaceHolderPicture} alt="Desarrollo web MERN" />
                                    </NavLink>
                                    
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default HeaderApp;