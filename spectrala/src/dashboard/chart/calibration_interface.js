import React from 'react';
import {ResponsiveLine} from '@nivo/line';
import {data} from './sample_data';
import PropTypes from 'prop-types';


export default class CalibrationLine extends React.Component {

    state = {
        isSelecting: false
    }
    
    showsBottomAxis = () => {
        return false
    }
    
    getBottomAxis = () => {
        if (!this.showsBottomAxis()) {
            return null;
        }
        const bottomAxis = {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: '.2f',
            legend: 'wavelength (nm)',
            legendOffset: 36,
            legendPosition: 'middle'
        }
        return bottomAxis
    }


    getData = () => {
        return this.props.rawData
    }

    // bottomAxis = null;
    render() {
        return (
                <ResponsiveLine
                data={data}
                margin={{ top: 15, right: 15, bottom: this.showsBottomAxis() ? 50 : 15, left: 60 }}
                xScale={{ type: 'linear', min: 'auto', max: 'auto'  }}
                yScale={{ type: 'linear', min: '0', max: '100' }}
                yFormat=" >-.2f"
                curve="monotoneX"
                axisTop={null}
                axisRight={null}
                axisBottom={this.getBottomAxis()}
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
                        lineStyle: { stroke: '#000', strokeWidth: 2 },
                        legend: '402nm',
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
                onClick={(point, event) => {
                    const xClick = point.data.x
                    console.log(`User clicked ${xClick}nm`)
                }}
                enableCrosshair={true}
                crosshairType={'bottom'}
                tooltip={() => {
                    return (
                        <div
                            style={{
                                color: '#333',
                                background: 'white',
                                padding: '3px 9px',
                                border: '1px solid #ccc',
                            }}
                        >
                            612nm
                        </div>
                    )
                }}
            />
        )
    }

}

CalibrationLine.propTypes = {
    rawData: PropTypes.array.isRequired
}