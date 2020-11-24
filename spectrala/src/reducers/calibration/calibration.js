import { createSlice } from '@reduxjs/toolkit';
import CalibrationPoint from './calibration_point';
import { calibrationPresets } from './calibration_constants';

export const defaultCalibration = calibrationPresets.cfl;

export const setAllPlacementStatusesFalse = (calibrationPoints) => {
    calibrationPoints.map((point) => point.setPlacementStatus(false));
};

export const calibrationSlice = createSlice({
    name: 'calibration',
    initialState: {
        calibrationPoints: defaultCalibration,
    },
    reducers: {
        modifyWavelength: (state, action) => {
            const point =
                state.calibrationPoints.value[action.payload.targetIndex];
            point.setWavelength(action.payload.value);
            /** Make sure the point cannot be placed if the new value is invalid. */
            if (point.isBeingPlaced && !point.isValidToPlace()) {
                point.setPlacementStatus(false);
            }
        },
        removePoint: (state, action) => {
            state.calibrationPoints.value.splice(action.payload.targetIndex, 1);
        },
        saveCalibration: (state) => {
            console.log('Save the calibration');
        },
        addOption: (state) => {
            state.calibrationPoints.value.push(
                new CalibrationPoint(null, null, false)
            );
        },
        beginPlace: (state, action) => {
            const points = state.calibrationPoints.value;
            const point = points[action.payload.targetIndex];
            setAllPlacementStatusesFalse(points);
            point.setPlacementStatus(true);
            point.setPlacement(null);
        },
        placePoint: (state, action) => {
            const points = state.calibrationPoints.value;
            const point = points[action.payload.targetIndex];
            const location = action.payload.value;
            point.setPlacementStatus(false);
            point.setPlacement(location);
        },
    },
});

export const {
    saveCalibration,
    modifyWavelength,
    removePoint,
    addOption,
    beginPlace,
    placePoint,
} = calibrationSlice.actions;

export const selectCalibrationPoints = (state) =>
    state.calibration.calibrationPoints.value;

export const selectTooltipLabel = (state) => {
    var pointBeingPlaced = null;
    state.calibrationPoints.value.forEach((point, idx) => {
        console.log(point);
        if (point.isBeingPlaced) {
            pointBeingPlaced = point;
        }
    });
    return pointBeingPlaced;
};

export default calibrationSlice.reducer;
