import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner } from 'react-bootstrap';
import Webcam from "react-webcam";
import logo from '../../spectrala_logo.svg';
import placeholder from './rainbow_placeholder.jpg';


export default class WebcamView extends React.Component {
    render() {
        return <img width={100} src={placeholder}/>
    }
}
