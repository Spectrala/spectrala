import { createSlice } from '@reduxjs/toolkit';
import * as CalibPt from './calibration_point';
import { calibrationPresets, expandPreset } from './calibration_constants';

export const defaultCalibration = calibrationPresets[1];

export const setAllPlacementStatusesFalse = (calibrationPoints) => {
    calibrationPoints.map((point) => CalibPt.setPlacementStatus(point, false));
};

export const calibrationSlice = createSlice({
    name: 'calibration',
    initialState: {
        calibrationPoints: expandPreset(defaultCalibration),
    },
    reducers: {
        modifyWavelength: (state, action) => {
            const point =
                state.calibrationPoints.value[action.payload.targetIndex];
            CalibPt.setWavelength(point, action.payload.value);
            /** Make sure the point cannot be placed if the new value is invalid. */
            if (point.isBeingPlaced && !CalibPt.isValidToPlace(point)) {
                CalibPt.setPlacementStatus(point, false);
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
                CalibPt.construct(null, null, false)
            );
        },
        beginPlace: (state, action) => {
            const points = state.calibrationPoints.value;
            const point = points[action.payload.targetIndex];
            setAllPlacementStatusesFalse(points);
            CalibPt.setPlacementStatus(point, true);
            CalibPt.setPlacement(point, null);
        },
        placePoint: (state, action) => {
            const points = state.calibrationPoints.value;
            const point = points[action.payload.targetIndex];
            const location = action.payload.value;
            CalibPt.setPlacementStatus(point, false);
            CalibPt.setPlacement(point, location);
        },
        cancelPlace: (state, action) => {
            const points = state.calibrationPoints.value;
            const point = points[action.payload.targetIndex];
            CalibPt.setPlacementStatus(point, false);
        },
        editPlacement: (state, action) => {
            const points = state.calibrationPoints.value;
            const point = points[action.payload.targetIndex];
            CalibPt.setPlacementStatus(point, true);
            CalibPt.setPlacement(point, null);
        },
        setPreset: (state, action) => {
            const preset = action.payload.preset;
            state.calibrationPoints = expandPreset(preset);
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
    cancelPlace,
    editPlacement,
    setPreset,
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
