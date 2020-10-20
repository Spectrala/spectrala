import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner, Card, ButtonGroup, Dropdown, Row, InputGroup, FormControl} from 'react-bootstrap';
import WebcamView from "./camera_implementations/webcam";
import placeholder from './camera_implementations/rainbow_placeholder.jpg';
import VideoOptions from "./video_options";
import { CameraFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

export default class CameraView extends React.Component {

    state = {
        videoPreferences: {},
    }

    getHeader = () => {
        return (
            <Card.Header as="h5" style={{height:"64px"}}>
                <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Col>
                        <Row >
                            <label style={{paddingLeft: '10px',paddingRight: '10px', alignItems: 'center', display: 'flex', height:"38px"}}>Source</label>
                            <ButtonGroup style={{height:"38px"}}>
                                <Button variant="dark">Webcam</Button>
                                <Button variant="outline-dark">Mobile/Raspberry Pi</Button>
                            </ButtonGroup>
                        </Row>
                    </Col>
                    <Col xs lg={2} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                HD Webcam 2
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Macintosh HD Webcam</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Card.Header> 
        )
    }

    getFooter = () => {
        return (
            <Card.Footer>
                <Row style={{display: 'flex'}}>
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Low Energy</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="X pct."
                                aria-label="X percentage"
                            />
                            <FormControl
                                placeholder="Y pct."
                                aria-label="Y percentage"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>High Energy</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="X pct."
                                aria-label="X percentage"
                            />
                            <FormControl
                                placeholder="Y pct."
                                aria-label="Y percentage"
                            />
                        </InputGroup>
                    </Col>
                    
                    <Col xs xl={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="outline-primary" style={{alignItems:"center"}}>
                            <CameraFill/> Save Snapshot
                        </Button>
                    </Col>
                    
                    
                </Row>
            </Card.Footer> 
        )
    }

    render() {
        return (
            <Row style={{justifyContent: 'center', display: 'flex'}}>
                <Col xs lg ={8}>
                    <Card>
                        {this.getHeader()}
                        <WebcamView height={this.props.height}/>
                        {this.getFooter()}
                    </Card>
                </Col>
                <Col xs lg ={3}>
                    <VideoOptions height={this.props.height}/>
                </Col>
            </Row>
        )
    }
}


CameraView.propTypes = {
    height: PropTypes.number
}