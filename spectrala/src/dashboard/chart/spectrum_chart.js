import React from 'react';
import {Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DataOptions from './data_options';
import spectrum from './spectrum_chart.png';
import {ResponsiveLine} from '@nivo/line';
import {data} from './sample_data';

const CalibrationLine = () => {
    var bottomAxis = {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: '.2f',
        legend: 'wavelength (nm)',
        legendOffset: 36,
        legendPosition: 'middle'
    }
    // bottomAxis = null;
    
    return (
        <ResponsiveLine
        data={data}
        margin={{ top: 15, right: 15, bottom: bottomAxis ? 50 : 15, left: 60 }}
        xScale={{ type: 'linear', min: 'auto', max: 'auto'  }}
        yScale={{ type: 'linear', min: '0', max: '100' }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={bottomAxis}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: '.0f',
            legend: 'intensity',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        markers={[
            {
                axis: 'x',
                value: data[0].data[5].x,
                lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
                legend: '402nm peak',
            },
        ]}
        enableGridX={false}
        colors={{ scheme: 'spectral' }}
        lineWidth={1}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaBaselineValue={0}
        areaOpacity={0.1}
        useMesh={true}
        legends={[]}
    />
)}

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
                        <div style={{height: this.props.height}}>
                            {CalibrationLine()}
                        </div>
                        {/* {this.getFooter()} */}
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