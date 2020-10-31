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
            'selectedSourceIndex': this.props.defaultSourceIndex,
            'hostedStreamLocation': {'port':'','ip':''},
        },
        isOversaturated: true,
    }

    sourceOptions = [
        "Webcam",
        "Mobile/Raspberry Pi",
        "File Upload"
    ]

    getHeader = () => {
        return (
            <Card.Header as="h5" style={{height:"64px"}}>
                {<SourceSelect onChange={this.onSourceSelectChange} sourceOptions={this.sourceOptions} defaultSourceIndex={this.state.selectedSource.selectedSourceIndex}/>}
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
        var name = this.sourceOptions[this.state.selectedSource.selectedSourceIndex];
        if (name == "Webcam") {
            return (<WebcamView height={this.props.height}/>)
        } else if (name == "Mobile/Raspberry Pi") {
            return (<MobileView height={this.props.height} ip={this.state.selectedSource.hostedStreamLocation.ip} port={this.state.selectedSource.hostedStreamLocation.port}/>)
        } else if (name == "File Upload") {
            return <label style={{height: this.props.height}}>TODO: put a view here</label>
        }
    }

    onSourceSelectChange = (data) => {
        this.setState({selectedSource: data})
    }

    getOversaturationAlert = () => {
        if (this.state.isOversaturated) 
            return (
                <Alert variant={'warning'} style={{marginBottom:"0px"}}>
                    Oversaturation detected. This message will disappear when the problem is resolved.{' '}
                    <Alert.Link href="#">Learn more</Alert.Link>. 
                </Alert> 
            );
    }

    render() {
        return (
            <Row style={{justifyContent: 'center', display: 'flex'}}>
                <Col xs lg ={8}>
                    <Card style={{display: 'flex', background:'FF0'}}>
                        {this.getHeader()}
                        {this.getOversaturationAlert()}   
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
    defaultSourceIndex: PropTypes.number,
}

CameraView.defaultProps = {
    defaultSourceIndex: 0,
}