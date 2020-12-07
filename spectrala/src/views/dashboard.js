import React from 'react';
import { Container, Col, Navbar, Nav, NavDropdown, Row } from 'react-bootstrap';
import logo from '../spectrala_logo.svg';
import CameraView from './video/camera';
import CalibrationSpectrumChart from './chart/calibration/calibration_interface';
import SpectrumChart from './chart/spectrum/spectrum_interface';

export default class Dashboard extends React.Component {
    getNavbar = () => {
        return (
            <Navbar bg="light" variant="light" fixed="top">
                <Navbar.Brand href="#home">
                    <img style={{ height: '40px' }} src={logo} alt="logo" />
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <NavDropdown title="Help" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">
                            Connecting a camera
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Calibration
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                            Data collection
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            About
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    };

    render() {
        return (
            <>
                {this.getNavbar()}
                <br/>
                <br/>
                <br/>
                <Container fluid>
                    <Row
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Col
                            xl={10}
                            style={{
                                flexFlow: 'column nowrap',
                                display: 'flex',
                                flex: 1,
                                width: '100vw',
                                justifyContent: 'center',
                            }}
                        >
                            <CameraView height={250} />
                            <CalibrationSpectrumChart height={350} />
                            <SpectrumChart height={350} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
