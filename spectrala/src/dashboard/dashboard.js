import React from 'react';
import { Container, Col, Navbar, Nav, NavDropdown, Row } from 'react-bootstrap';
import logo from '../spectrala_logo.svg';
import CameraView from './video/camera';
import SpectrumChart from './chart/calibration/calibration_interface';
import MasterFeed from './data_handlers/master_feed';

export default class Dashboard extends React.Component {
    state = {
        feed: new MasterFeed({
            refreshRate: 1
        }, this.onSpectralGraphChange)
    };

    onSpectralGraphChange = () => {
        console.log(
            'Dashboard.onSpectralGraphChange - Look folks, another wave of data has arrived'
        );
    };

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
                <Col>
                    <Row
                        xs
                        xl={1}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingBottom: '16px',
                        }}
                    >
                        <CameraView height={250} cameraFeed={this.state.feed.getCameraFeed()}  />
                    </Row>
                    <Row
                        xs
                        xl={1}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <SpectrumChart height={400} cameraFeed={this.state.feed.getCameraFeed()} />
                    </Row>
                </Col>
            </Container>
        );
    }
}
