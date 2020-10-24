import React from 'react';
import {Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DataOptions from './data_options';
import spectrum from './spectrum_chart.png';
export default class SpectrumChart extends React.Component {



    getHeader = () => {
        return (
            <Card.Header as="h5" style={{height:"64px", display:"flex",alignItems:"center",paddingLeft:"15px",paddingRight:"15px"}}>Spectrum</Card.Header> 
        )
    }


    getFooter = () => {
        return (
            <Card.Footer>
                <Row style={{display: 'flex'}}>
                    <label>Some adjustment tools for calibration</label>
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
                        <img height={this.props.height} src={spectrum} alt={"Dummy spectrum"}/>
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