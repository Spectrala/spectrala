import { createSlice } from '@reduxjs/toolkit';
import CalibrationPoints from './calibration_points';
import {
    MINIMUM_WAVELENGTH,
    MAXIMUM_WAVELENGTH,
    calibrationPresetsOrder,
    calibrationPresets,
} from './calibration_constants';

export const defaultCalibration = calibrationPresets.cfl;

export const calibrationSlice = createSlice({
    name: 'calibration',
    initialState: {
        calibrationPoints: defaultCalibration,
    },
    reducers: {
        modifyWavelength: (state, action) => {
            console.log(state, action);
        },
        saveCalibration: (state) => {
            console.log('Save the calibration');
        },
    },
});

export const { saveCalibration } = calibrationSlice.actions;

export const selectCalibrationPoints = (state) =>
    state.calibration.calibrationPoints.value;

export default calibrationSlice.reducer;
