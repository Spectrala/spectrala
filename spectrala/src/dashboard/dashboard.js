import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner } from 'react-bootstrap';
import logo from '../spectrala_logo.svg';

export default class Dashboard extends React.Component {

    state = {};

    componentDidMount() {
        this.authSequence()   
        //Comment
    }

    authSequence = async () => {
        console.log("Hello, world")
    }

    render() {
        return (
            <Container>
                 <Navbar bg="light" expand="lg">
                    <img style={{height:'60px'}} src={logo} alt="logo" />
                    {/* <Navbar.Brand>Spectrala</Navbar.Brand> */}
                    
                </Navbar>
                <Col>
                    <Button>Click me</Button>
                </Col>
            </Container>            
        );
    }

}
