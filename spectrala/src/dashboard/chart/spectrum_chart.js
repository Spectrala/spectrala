import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Col, Navbar, Spinner, Card, ButtonGroup, Dropdown, Row, InputGroup, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DataOptions from './data_options';
import spectrum from './spectrum_chart.png';
export default class SpectrumChart extends React.Component {



    getHeader = () => {
        return (
            <Card.Header as="h5" style={{height:"64px"}}>Spectrum</Card.Header> 
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
                            Save Snapshot
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
                        <img height={this.props.height} src={spectrum}/>
                        {this.getFooter()}
                    </Card>
                </Col>
                <Col xs lg ={3}>
                    <DataOptions height={this.props.height}/>
                </Col>
            </Row>
        )
    }
}


SpectrumChart.propTypes = {
    height: PropTypes.number
}