import React from 'react';
import {Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DataOptions from './data_options';
import spectrum from './spectrum_chart.png';
import {ResponsiveLine} from '@nivo/line';
import {data} from './sample_data';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = () => {
    return (
        <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: 'linear', min: 'auto', max: 'auto'  }}
        yScale={{ type: 'linear', min: '0', max: '100' }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickValues: [
                382.2,
                443.4,
                504.7,
                566.0,
                627.3,
                688.6
            ],
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: '.2f',
            legend: 'wavelength (nm)',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickValues: [
                0,
                20,
                40,
                60,
                80,
                100
            ],
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: '.2s',
            legend: 'intensity',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
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
        gridXValues={[ 300, 600, 900 ]}
        gridYValues={[ 0, 500, 1000, 1500, 2000, 2500 ]}
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
                            {MyResponsiveLine()}
                        </div>
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