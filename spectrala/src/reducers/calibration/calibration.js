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
            const point = state.calibrationPoints.value[
                action.payload.targetIndex
            ];
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
        getPointBeingPlaced: (state) => {
            var pointBeingPlaced = null;
            state.calibrationPoints.value.forEach((point, idx) => {
                if (point.isBeingPlaced) {
                    pointBeingPlaced = point;
                }
            });
            return pointBeingPlaced;
        },
        isCurrentlyPlacing: (state) => {
            return !!this.getPointBeingPlaced(state);
        },
        handleSelection: (state, action) => {
            const xPosition = action.payload.value;
            if (this.isCurrentlyPlacing(state)) {
                var point = this.getPointBeingPlaced();
                if (this.isValidPlacement(point, xPosition)) {
                    this.placePoint(point, xPosition);
                } else {
                    this.triggerBadPlacement();
                }
            } else if (this.pointFallsOnLocation(xPosition)) {
                var pointIdx = this.getPointIndexThatFallsOnLocation(xPosition);
                this.editOption(pointIdx);
            }
        },
    },
});

export const {
    saveCalibration,
    modifyWavelength,
    removePoint,
    addOption,
    beginPlace,
    getPointBeingPlaced,
    handleSelection,
} = calibrationSlice.actions;

export const selectCalibrationPoints = (state) =>
    state.calibration.calibrationPoints.value;

export default calibrationSlice.reducer;
