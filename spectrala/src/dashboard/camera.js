import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner, Card, ButtonGroup, Dropdown} from 'react-bootstrap';
import WebcamView from "./camera_implementations/webcam";
import placeholder from './camera_implementations/rainbow_placeholder.jpg';


export default class CameraView extends React.Component {

    state = {
        videoPreferences: {}
    }

    
    render() {
        return (

            <Card>
                <Card.Header as="h5">Video Source
                </Card.Header> 
                
                <WebcamView/>


                <Card.Footer>Video Source</Card.Footer> 
            </Card>
        )
    }
}
