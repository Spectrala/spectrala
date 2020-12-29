import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useDispatch, useSelector } from 'react-redux';
import { selectChartData } from '../../../reducers/video';
import {
    selectCalibrationPoints,
    placePoint,
} from '../../../reducers/calibration/calibration';
import * as CalibPt from '../../../reducers/calibration/calibration_point';
import { cardStyle, cardHeaderStyle } from '../../theme/styles';

// import { calibrationPresets } from '../../../reducers/calibration/calibration_constants';

export default function CalibrationLine() {
    const data = useSelector(selectChartData);
    const calibrationPoints = useSelector(selectCalibrationPoints);
    const dispatch = useDispatch();
    const CLOSE_POINT_THRESHOLD = 0.015;

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

    function getSetPoints() {
        return calibrationPoints.filter(CalibPt.hasBeenPlaced);
    }

    function getPlacedMarkers() {
        return getSetPoints().map((point) => {
            var description = CalibPt.getWavelengthDescription(point);
            var location = CalibPt.getPlacement(point);
            return {
                axis: 'x',
                value: location,
                lineStyle: {
                    stroke: '#000',
                    strokeWidth: 2,
                },
                legend: description,
            };
        });
    }

    function getTooltip() {
        var point = getPointBeingPlaced().point;
        if (!point) {
            return null;
        }
        var label = CalibPt.getWavelengthDescription(point);
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

    function getPointBeingPlaced() {
        var pointBeingPlaced = null;
        var index = null;
        calibrationPoints.forEach((point, idx) => {
            if (point.isBeingPlaced) {
                pointBeingPlaced = point;
                index = idx;
            }
        });
        return {
            point: pointBeingPlaced,
            idx: index,
        };
    }

    function isCurrentlyPlacing() {
        return !!getPointBeingPlaced().point;
    }

    function triggerBadPlacement() {
        console.warn('TODO: Bad point drop detected. Alert user.');
    }

    function isValidPlacement(point, xPosition) {
        return getSetPoints().every((setPoint) => {
            const p1 = CalibPt.getPlacementLocationDescription(setPoint);
            const p2 = {
                rawWavelength: CalibPt.getWavelength(point),
                placement: xPosition,
            };
            const slope =
                (p2.rawWavelength - p1.rawWavelength) /
                (p2.placement - p1.placement);
            return slope > 0;
        });
    }

    function getPointIndexThatFallsOnLocation(location) {
        var pointDistances = [];
        // Want to get the point closest to the click
        calibrationPoints.forEach((point, idx) => {
            var placement = CalibPt.getPlacement(point);
            if (placement) {
                pointDistances.push({
                    idx: idx,
                    residual: Math.abs(placement - location),
                });
            }
        });

        // If there are no points, return null
        if (pointDistances.length === 0) return null;

        // Retrieve the closest point.
        var minResidual = pointDistances.sort(
            (a, b) => a.residual - b.residual
        )[0];

        // If this point is close enough to a click by the CLOSE_POINT_THRESHOLD, return its index.
        if (minResidual < CLOSE_POINT_THRESHOLD) return minResidual.idx;

        // Otherwise, return null.
        return null;
    }

    function pointFallsOnLocation(location) {
        return !!getPointIndexThatFallsOnLocation(location);
    }

    function handleSelection(action) {
        const xPosition = action.value;
        if (isCurrentlyPlacing()) {
            var ongoingPlacement = getPointBeingPlaced();
            var point = ongoingPlacement.point;
            var idx = ongoingPlacement.idx;
            if (isValidPlacement(point, xPosition)) {
                dispatch(
                    placePoint({
                        value: xPosition,
                        targetIndex: idx,
                    })
                );
            } else {
                triggerBadPlacement();
            }
        } else if (pointFallsOnLocation(xPosition)) {
            var pointIdx = getPointIndexThatFallsOnLocation(xPosition);
            this.editOption(pointIdx);
        }
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
        const shouldShowCrosshair = isCurrentlyPlacing();

        return (
            <ResponsiveLine
                data={data}
                animate={false}
                margin={{
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}
                xScale={{ type: 'linear', min: '0', max: '1' }}
                yScale={{ type: 'linear', min: '0', max: '100' }}
                yFormat=" >-.2f"
                curve="linear"
                axisTop={null}
                axisRight={null}
                axisBottom={getBottomAxis()}
                axisLeft={null}
                markers={getPlacedMarkers()}
                enableGridX={false}
                colors={{ scheme: 'spectral' }}
                lineWidth={2}
                pointSize={4}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={1}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                enableArea={true}
                areaOpacity={0.1}
                useMesh={true}
                onClick={(point, event) => {
                    handleSelection({
                        value: point.data.x,
                    });
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
