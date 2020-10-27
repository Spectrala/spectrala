import React from 'react';
import {Button, Col, Card, Row, InputGroup, FormControl, Alert} from 'react-bootstrap';
import PropTypes from 'prop-types';
import SourceSelect from './source_select';
import WebcamView from "./camera_implementations/webcam";
import MobileView from "./camera_implementations/mobile";
import VideoOptions from "./adjustments";
import { CameraFill } from 'react-bootstrap-icons';

export default class CameraView extends React.Component {

    state = {
        videoPreferences: {},
        selectedSource: {
            'webcamIsSelected': this.props.webcamIsDefault,
            'hostedStreamLocation': {'port':'','ip':''},
        }
    }

    getHeader = () => {
        return (
            <Card.Header as="h5" style={{height:"64px"}}>
                {<SourceSelect onChange={this.onSourceSelectChange} webcamIsSelected={this.state.selectedSource.webcamIsSelected}/>}
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


    getCameraView = () => {
        if (this.state.selectedSource.webcamIsSelected) {
            return (<WebcamView height={this.props.height}/>)
        } else {
            return (<MobileView height={this.props.height} ip={this.state.selectedSource.hostedStreamLocation.ip} port={this.state.selectedSource.hostedStreamLocation.port}/>)
        }
    }

    onSourceSelectChange = (data) => {
        this.setState({selectedSource: data})
    }

    render() {
        return (
            <Row style={{justifyContent: 'center', display: 'flex'}}>
                <Col xs lg ={8}>
                    <Card style={{display: 'flex', background:'FF0'}}>
                        {this.getHeader()}
                        <Alert variant={'warning'} style={{marginBottom:"0px"}}>
                            Oversaturation detected. This message will disappear when the problem is resolved.{' '}
                            <Alert.Link href="#">Learn more</Alert.Link>. 
                        </Alert>    
                        {this.getCameraView()}
                        {this.getFooter()}
                    </Card>
                </Col>
                <Col xs lg ={3}>
                    <VideoOptions/>
                </Col>
            </Row>
        )
    }
}


CameraView.propTypes = {
    height: PropTypes.number,
    webcamIsDefault: PropTypes.bool,
}

CameraView.defaultProps = {
    webcamIsDefault: false,
}