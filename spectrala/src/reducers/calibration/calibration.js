import { createSlice } from '@reduxjs/toolkit';
// import CalibrationPoints from './calibration_points';
import { calibrationPresets } from './calibration_constants';

export const defaultCalibration = calibrationPresets.cfl;

export const calibrationSlice = createSlice({
    name: 'calibration',
    initialState: {
        calibrationPoints: defaultCalibration,
    },
    reducers: {
        modifyWavelength: (state, action) => {
            var point =
                state.calibrationPoints.value[action.payload.targetIndex];
            point.setWavelength(action.payload.value);
            /** Make sure the point cannot be placed if the new value is invalid. */
            if (point.isBeingPlaced && !point.isValidToPlace()) {
                point.setPlacementStatus(false);
            }

            state.calibrationPoints.value[action.payload.targetIndex] = point;
            console.log(state.calibrationPoints.value.map((p) => p.wavelength));
        },
        saveCalibration: (state) => {
            console.log('Save the calibration');
        },
    },
});

export const { saveCalibration, modifyWavelength } = calibrationSlice.actions;

export const selectCalibrationPoints = (state) =>
    state.calibration.calibrationPoints.value;

export default calibrationSlice.reducer;
