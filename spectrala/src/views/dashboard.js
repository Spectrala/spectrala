import React from 'react';
import { Container, Col, Navbar, Nav, NavDropdown, Row } from 'react-bootstrap';
import logo from '../spectrala_logo.svg';
import CameraView from './video/camera';
import CalibrationSpectrumChart from './chart/calibration/calibration_interface';
import ReferenceSpectrumChart from './chart/reference_spectrum/reference_interface';
import ResultantSpectrumChart from './chart/resultant_spectrum/resultant_interface';

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
            <Container fluid>
                <Row style={{ height: '80px' }}>{this.getNavbar()}</Row>
                <Col 
                    style={{
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}
                >
                    <Row
                        xs
                        xl={1}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingBottom: '16px',
                        }}
                    >
                        <CameraView height={250} />
                    </Row>
                    <Row
                        xs
                        xl={1}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingBottom: '16px',
                        }}
                    >
                        <CalibrationSpectrumChart height={350} />
                    </Row>
                    <Row
                        xs
                        xl={1}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingBottom: '16px',
                        }}
                    >
                        <ReferenceSpectrumChart height={350} />
                    </Row>
                    <Row
                        xs
                        xl={1}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingBottom: '16px',
                        }}
                    >
                        <ResultantSpectrumChart height={350} />
                    </Row>
                </Col>
            </Container>
        );
    }
}
