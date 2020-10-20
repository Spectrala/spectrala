import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner, Nav, Form, FormControl, NavDropdown, Row} from 'react-bootstrap';
import logo from '../spectrala_logo.svg';
import CameraView from './video/camera';
import SpectrumChart from './chart/spectrum_chart'

export default class Dashboard extends React.Component {

    state = {};

    componentDidMount() {
        this.authSequence()
    }

    authSequence = async () => {
        console.log("Hello, world")
    }

    getNavbar = () => {
        return (

            <Navbar bg="light" variant="light" fixed="top" >
                <Navbar.Brand href="#home"> 
                    <img style={{height:'40px'}} src={logo} alt="logo" />
                </Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Option 1</Nav.Link>
                <Nav.Link href="#features">Option 2</Nav.Link>
                <Nav.Link href="#pricing">Option 3</Nav.Link>

                <NavDropdown title="Help" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Connecting a camera</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Calibration</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Data collection</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">About</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar>
        )
    }

    render() {
        return (
            <Container fluid>
                <Row style={{height:'80px'}}>
                    {this.getNavbar()}
                </Row>
                <Col>
                    <Row style={{display:'flex', justifyContent:'center', paddingBottom:'16px'}}>
                        <CameraView height={200}/>
                    </Row>
                    <Row style={{display:'flex', justifyContent:'center'}}>
                        <SpectrumChart height={400}/>
                    </Row>
                </Col>
            </Container>            
        );
    }

}
