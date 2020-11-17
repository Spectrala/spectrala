import { createSlice } from '@reduxjs/toolkit';
import CalibrationPoints from './calibration_points';
import {
    MINIMUM_WAVELENGTH,
    MAXIMUM_WAVELENGTH,
    calibrationPresetsOrder,
    calibrationPresets,
} from './calibration_constants';

/**
 * Adjustments: An object representing the sliders for modifying attributes
 * of video input (brightness/contrast/hue/saturation).
 *   value: The number between 0 and 100 the slider is set to.
 *   title: The label the user sees.
 */
export const defaultCalibration = calibrationPresets.cfl;

export const calibrationSlice = createSlice({
    name: 'calibration',
    initialState: {
        calibrationPoints: defaultCalibration,
    },
    reducers: {
        saveCalibration: (state) => {
            console.log('Save the calibration');
        },
    },
});

export const { saveCalibration } = calibrationSlice.actions;

export const selectCalibrationPoints = (state) => state.calibration;
// export const selectCalibrationPoints = (state) => state.calibration.calibrationPoints;

export default calibrationSlice.reducer;
