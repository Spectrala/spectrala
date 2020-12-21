import React from 'react';
import {
    Container,
    Col,
    Navbar,
    Nav,
    Row,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Card,
} from 'react-bootstrap';
import logo from '../spectrala_logo.svg';
import {
    Moon,
    Download,
    Sun,
    JournalArrowUp,
    Question,
    InfoCircleFill,
    InfoCircle,
} from 'react-bootstrap-icons';
import Video from './video/video';
import CalibrationSpectrumChart from './chart/calibration/calibration_interface';
import SpectrumChart from './chart/spectrum/spectrum_interface';
import SaveButton from './persistence/save_btn';
import LoadButton from './persistence/load_btn';
import { navBody, containerStyle, activeNavItem } from './theme/styles';

export default class Dashboard extends React.Component {
    // TODO: make the help menu do something before you show it to the user
    getHelpMenu = () => {
        // const helpMenu = (
        //     <NavDropdown title="Help" id="collasible-nav-dropdown">
        //         <NavDropdown.Item href="#action/3.1">
        //             Connecting a camera
        //         </NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.2">
        //             Calibration
        //         </NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.3">
        //             Data collection
        //         </NavDropdown.Item>
        //         <NavDropdown.Divider />
        //         <NavDropdown.Item href="#action/3.4">About</NavDropdown.Item>
        //     </NavDropdown>
        // );
        return null;
    };

    getLogoImg = () => {
        return <img style={{ height: '40px' }} src={logo} alt="logo" />;
    };
    getSaveLoad = () => {
        return (
            <div style={{ marginLeft: 'auto' }}>
                {this.getHelpMenu()}
                <SaveButton />
                <LoadButton />
            </div>
        );
    };

    getNavbar = () => {
        return (
            <Navbar style={navBody} fixed="top">
                <Navbar.Brand>
                    <img style={{ height: '40px' }} src={logo} alt="logo" />
                </Navbar.Brand>
                <Nav
                    activeKey={'asdf'}
                    style={{
                        width: '100%',
                        display: 'flex',
                    }}
                >
                    <Nav.Item key={'asdf'}>
                        <Nav.Link href="asdf">Calibrate</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={activeNavItem}>
                        <Nav.Link>Record</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>View</Nav.Link>
                    </Nav.Item>
                    <div style={{ marginLeft: 'auto' }}>
                        {this.getHelpMenu()}
                        <SaveButton />
                        <LoadButton />
                    </div>
                </Nav>
            </Navbar>
        );
    };

    getDarkLight = () => {
        const isDark = true;
        return isDark ? <Moon /> : <Sun />;
    };

    getHintsIcon = () => {
        const isDark = true;
        return isDark ? <Moon /> : <Sun />;
    };

    iconButtons = {
        THEME: 'theme',
        DOWNLOAD: 'download',
        RESTORE: 'restore',
        HINTS: 'hints',
    };

    handleClick = (iconButton) => {
        console.log(iconButton);
    };

    render() {
        return (
            <Container fluid style={containerStyle}>
                <Navbar
                    expand="sm"
                    fixed="top"
                    bg="light"
                    style={{ height: '64px' }}
                >
                    <Row>
                        <img
                            style={{
                                height: '28px',
                                alignSelf: 'center',
                                paddingLeft: '16px',
                                paddingRight: '16px',
                            }}
                            src={logo}
                            alt="logo"
                        />
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse
                            id="basic-navbar-nav"
                            className="justify-content-end"
                        >
                            <Nav
                                onSelect={(key) => this.handleClick(key)}
                                className="justify-content-end"
                            >
                                <Nav.Link eventKey={this.iconButtons.DOWNLOAD}>
                                    <SaveButton />
                                </Nav.Link>
                                <Nav.Link eventKey={this.iconButtons.RESTORE}>
                                    <LoadButton />
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Row>
                </Navbar>

                <Row
                    style={{
                        justifyContent: 'center',
                    }}
                >
                    <Col
                        xl={8}
                        style={{
                            flexFlow: 'column nowrap',
                            display: 'flex',
                            flex: 1,
                            width: '100vw',
                            justifyContent: 'center',
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}
                    >
                        <div
                            style={{
                                marginTop: 64,
                                paddingLeft: 16,
                                paddingRight: 16,
                            }}
                        >
                            <Video height={250} />
                            <CalibrationSpectrumChart height={350} />
                            <SpectrumChart height={350} />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
