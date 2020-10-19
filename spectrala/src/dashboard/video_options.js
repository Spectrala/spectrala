import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner, Card, ButtonGroup, Dropdown, Row} from 'react-bootstrap';
import WebcamView from "./camera_implementations/webcam";
import placeholder from './camera_implementations/rainbow_placeholder.jpg';


export default class VideoOptions extends React.Component {

    state = {
        videoPreferences: {},
    }


    render() {
        return (
            <Card>
                <Card.Header as="h5" style={{height:"64px"}}>
                    <Row style={{display: 'flex'}}>
                        <label style={{paddingLeft: '10px', justifyContent: 'center', alignItems: 'center', display: 'flex', height:"38px"}}>Video Source</label>
                        <div style={{width:"20px"}}/>

                        <ButtonGroup style={{height:"38px"}}>
                            <Button variant="dark">Webcam</Button>
                            <Button variant="secondary">Mobile/Raspberry Pi</Button>
                        </ButtonGroup>


                        <div style={{width:"20px"}}/>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                HD Webcam 2
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Macintosh HD Webcam</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </Card.Header> 
                
                <WebcamView/>

                <Card.Footer>More info</Card.Footer> 
            </Card>
        )
    }
}
