import React from 'react';
import { Container, Col, Navbar, Nav, Row } from 'react-bootstrap';
import logo from '../spectrala_logo.svg';
import { Moon, Sun } from 'react-bootstrap-icons';
import SaveButton from './persistence/save_btn';
import LoadButton from './persistence/load_btn';
import { navBody, containerStyle, activeNavItem } from './theme/styles';
import { Walkthrough } from './walkthrough/walkthrough';
import { WidgetsView } from './walkthrough/widgets';

const feedbackEmail =
`mailto:spectrala.feedback@gmail.com?subject=Spectrala Feedback&body=
Hi, I found something in Spectrala that you should look into: %0A%0A
When I try to use [specific function of the app that isn't working or could be improved upon],%0A%0A
I expected [what the correct behavior of an app would be, or what something would ideally look like].%0A%0A
Instead, [the incorrect behavior of the app that happened or unideal appearance of something in the app].%0A%0A
Here's a screenshot of what I'm talking about: [insert screenshot]%0A%0A
[Or, tell us something else!]`;

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
        console.warn(`Do something with handleClick: ${iconButton}`);
    };

    saveLoad = (
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
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
    );

    render() {
        return (
            <Container fluid style={containerStyle}>
                <Navbar
                    expand="sm"
                    fixed="top"
                    bg="light"
                    style={{ height: '64px', width: '100%' }}
                >
                    <Row
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
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
                        <a
                            style={{ color: '#555' }}
                            href={feedbackEmail}
                            target={"_blank"}
                            rel ={"noopener noreferrer"}
                        >
                            Submit feedback
                        </a>
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
                        xs={8}
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
                            <WidgetsView />
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
