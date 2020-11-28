import { createSlice } from '@reduxjs/toolkit';
import { selectIntensities } from './video';
import { selectCalibrationPoints } from './calibration/calibration';
import { validateCalibrationPoints, getCalibratedSpectrum } from './calibration/calibration_math';

export const spectrumSlice = createSlice({
    name: 'spectrum',
    initialState: {
        spectrum: null,
    },
    reducers: {
        helloWorld: (state, action) => {
            // const target = action.payload.targetIndex;
            return null;
        },
    },
});

export const { helloWorld } = spectrumSlice.actions;

export const selectSpectrumChartData = (state) => {
    const intensities = selectIntensities(state);
    const calibrationPoints = selectCalibrationPoints(state).map((point) =>
        point.getPlacementLocationDescription()
    );
    const validation = validateCalibrationPoints(calibrationPoints);
    if (!validation.valid) {
        const failureMessage = validation.message;
        return failureMessage;
    }
    return getCalibratedSpectrum(intensities, validation.sortedCalibrationPoints);
};


export default spectrumSlice.reducer;
