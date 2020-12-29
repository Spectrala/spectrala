import React from 'react';
import {
    Container,
    Col,
    Navbar,
    Nav,
    Row,
} from 'react-bootstrap';
import logo from '../spectrala_logo.svg';
import { Moon, Sun } from 'react-bootstrap-icons';
import SaveButton from './persistence/save_btn';
import LoadButton from './persistence/load_btn';
import { navBody, containerStyle, activeNavItem } from './theme/styles';
import { Walkthrough } from './walkthrough/walkthrough';
import { WidgetsView } from './walkthrough/widgets';

export default class Dashboard extends React.Component {
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
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 64,
                    }}
                >
                    <Col
                        xl={8}
                        style={{
                            justifyContent: 'center',
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}
                    >
                        <div
                            style={{
                                paddingLeft: 16,
                                paddingRight: 16,
                            }}
                        >
                            <WidgetsView/>
                        </div>
                    </Col>
                    <Col xs={4} style={{ paddingTop: 11 }}>
                        <Walkthrough />
                    </Col>
                </Row>
            </Container>
        );
    }
}
