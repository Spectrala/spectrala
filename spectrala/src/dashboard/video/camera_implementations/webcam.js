import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner } from 'react-bootstrap';
import Webcam from "react-webcam";
import placeholder from './rainbow_placeholder.jpg';
import PropTypes from 'prop-types';


export default class WebcamView extends React.Component {
    render() {
        return <img src={placeholder} style={{height: this.props.height}}/>
    }
}

WebcamView.propTypes = {
  height: PropTypes.number
}
