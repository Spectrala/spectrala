import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useDispatch, useSelector } from 'react-redux';
import { selectChartData } from '../../../reducers/video';
import {
    selectCalibrationPoints,
    getPointBeingPlaced,
    handleSelection,
} from '../../../reducers/calibration/calibration';

export default function CalibrationLine() {
    const data = useSelector(selectChartData);
    const calibrationPoints = useSelector(selectCalibrationPoints);
    const dispatch = useDispatch();

    if (!data) {
        return getLoadingScreen();
    } else {
        return getLineGraph();
    }

    function showsBottomAxis() {
        return false;
    }

    function getBottomAxis() {
        if (!showsBottomAxis()) {
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
    }

    function getPlacedMarkers() {
        return calibrationPoints
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
    }

    function getTooltip() {
        var point = getPointBeingPlaced();
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
    }

    function getLoadingScreen() {
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
                Waiting for data. Make sure to set points of interest on camera
                feed.
            </label>
        );
    }

    function getLineGraph() {
        // const shouldShowCrosshair = this.props.calibrationPoints.isCurrentlyPlacing();
        const shouldShowCrosshair = false;

        return (
            <ResponsiveLine
                data={data}
                animate={false}
                margin={{
                    top: 15,
                    right: 15,
                    bottom: showsBottomAxis() ? 50 : 15,
                    left: 60,
                }}
                xScale={{ type: 'linear', min: '0', max: '1' }}
                yScale={{ type: 'linear', min: '0', max: '100' }}
                yFormat=" >-.2f"
                curve="linear"
                axisTop={null}
                axisRight={null}
                axisBottom={getBottomAxis()}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: '.0f',
                    legend: 'intensity',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                markers={getPlacedMarkers()}
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
                    dispatch(handleSelection({
                        value: point.data.x
                    }))
                }}
                crosshairType={'bottom'}
                enableCrosshair={shouldShowCrosshair}
                tooltip={getTooltip}
                layers={[
                    'grid',
                    'markers',
                    'axes',
                    'areas',
                    'crosshair',
                    'lines',
                    'slices',
                    'mesh',
                ]}
            />
        );
    }
}
