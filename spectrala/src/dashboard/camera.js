import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner, Card, ButtonGroup, Dropdown, Row} from 'react-bootstrap';
import WebcamView from "./camera_implementations/webcam";
import placeholder from './camera_implementations/rainbow_placeholder.jpg';
import VideoOptions from "./video_options";
import { CameraFill } from 'react-bootstrap-icons';

export default class CameraView extends React.Component {

    state = {
        videoPreferences: {},
    }


    render() {
        return (
            <Row>
                <Card>
                    <Card.Header as="h5" style={{height:"64px"}}>
                        <Row style={{display: 'flex'}}>
                            <Col xs={2} md={2} lg={2} xl={2}>
                                <label style={{paddingLeft: '10px', alignItems: 'center', display: 'flex', height:"38px"}}>Video Source</label>
                            </Col>
                            <Col style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <ButtonGroup style={{height:"38px"}}>
                                    <Button variant="dark">Webcam</Button>
                                    <Button variant="secondary">Mobile/Raspberry Pi</Button>
                                </ButtonGroup>
                            </Col>
                            <Col xs={2} md={2} lg={2} xl={2} style={{display: 'flex', justifyContent: 'flex-end'}}>
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
                    
                    <WebcamView/>

                    <Card.Footer>
                        <Row style={{display: 'flex'}}>
                            <Col xs={2} md={2} lg={2} xl={2}>
                                <label style={{paddingLeft: '10px', alignItems: 'center', display: 'flex', height:"38px"}}>Video Source</label>
                            </Col>
                            <Col style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <ButtonGroup style={{height:"38px"}}>
                                    <Button variant="dark">Webcam</Button>
                                    <Button variant="secondary">Mobile/Raspberry Pi</Button>
                                </ButtonGroup>
                            </Col>
                            <Col xs={4} md={4} lg={4} xl={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button variant="outline-primary" style={{alignItems:"center"}}>
                                    <CameraFill/> Save Snapshot
                                </Button>
                            </Col>
                            
                            
                        </Row>
                    </Card.Footer> 
                </Card>
                <VideoOptions/>
            </Row>
        )
    }
}
