import React from 'react';
import { data } from '../sample_data';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import CalibrationPoints from './helper_classes/calibration_points';
/* 
TODO: Make this inherit from a more generic type of line. 
Shouldn't have to import ResponsiveLine for both calibration 
and displaying spectra.
*/
export default class CalibrationLine extends React.Component {
    state = {
        isSelecting: false,
    };

    showsBottomAxis = () => {
        return false;
    };

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
            legendPosition: 'middle',
        };
        return bottomAxis;
    };

    getData = () => {
        return this.props.rawData;
    };

    getPlacedMarkers = () => {
        return this.props.calibrationPoints
            .getSetPoints()
            .map((description) => {
                return {
                    axis: 'x',
                    value: description['placement'],
                    lineStyle: {
                        stroke: '#000',
                        strokeWidth: 2,
                    },
                    legend: description['wavelength'],
                };
            });
    };

    getTooltip = () => {
        var point = this.props.calibrationPoints.getPointBeingPlaced();
        if (!point) {
            return;
        }
        var label = point.getWavelengthDescription();
        return (
            <div
                style={{
                    color: '#333',
                    background: 'white',
                    padding: '3px 9px',
                    border: '1px solid #ccc',
                }}
            >
                {label}
            </div>
        );
    };

    // bottomAxis = null;
    render() {
        var shouldShowCrosshair = this.props.calibrationPoints.isCurrentlyPlacing();
        shouldShowCrosshair = true;
        return (
            <ResponsiveLine
                data={data}
                animate={false}
                margin={{
                    top: 15,
                    right: 15,
                    bottom: this.showsBottomAxis() ? 50 : 15,
                    left: 60,
                }}
                xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
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
                    legendPosition: 'middle',
                }}
                markers={this.getPlacedMarkers()}
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
                    const xClick = point.data.x;
                    console.log(`User clicked x=${xClick}`);
                }}
                crosshairType={'bottom'}
                enableCrosshair={shouldShowCrosshair}
                tooltip={this.getTooltip}
            />
        );
    }
}

CalibrationLine.propTypes = {
    rawData: PropTypes.array.isRequired,
    calibrationPoints: PropTypes.object.isRequired,
};
