import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import CalibrationPoints from './helper_classes/calibration_points';
import CameraFeed from '../../data_handlers/camera_feed';


export default class CalibrationLine extends React.Component {
    state = {
        isSelecting: false,
        data: null,
    };

    componentDidMount() {
        this.props.cameraFeed.addListener((() => this.listenToStream()));
    }

    listenToStream = () => {
        this.setState({ data: this.getData() });
    };

    getData = () => {
        return this.props.cameraFeed.getChartData();
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
            return null;
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
        if (!this.state.data) {
            return (
                <label
                    style={{
                        display: 'flex',
                        flex: '1',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Waiting for data. Make sure to set points of interest on
                    webcam.
                </label>
            );
        }
        return (
            <ResponsiveLine
                data={this.state.data}
                animate={false}
                margin={{
                    top: 15,
                    right: 15,
                    bottom: this.showsBottomAxis() ? 50 : 15,
                    left: 60,
                }}
                xScale={{ type: 'linear', min: '0', max: '1' }}
                yScale={{ type: 'linear', min: '0', max: '100' }}
                yFormat=" >-.2f"
                curve="linear"
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
                lineWidth={2}
                pointSize={4}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={1}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                enableArea={false}
                areaOpacity={0.1}
                useMesh={true}
                onClick={(point, event) => {
                    const xClick = point.data.x;
                    this.props.calibrationPoints.handleSelection(xClick);
                }}
                crosshairType={'bottom'}
                enableCrosshair={shouldShowCrosshair}
                tooltip={this.getTooltip}
                layers={['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines','slices', 'mesh']}
            />
        );
    }
}

CalibrationLine.propTypes = {
    calibrationPoints: PropTypes.object.isRequired,
    cameraFeed: PropTypes.object.isRequired,
};
