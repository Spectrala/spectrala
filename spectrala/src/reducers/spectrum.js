import { createSlice } from '@reduxjs/toolkit';
import { selectIntensities } from './video';
import { selectCalibrationPoints } from './calibration/calibration';
import {
    validateCalibrationPoints,
    getCalibratedSpectrum,
} from './calibration/calibration_math';
import SpectralDataResponse from './spectral_data_response';

// Default name prefix for saving a spectrum. Will start naming as DEFAULT_NAME 1.
const DEFAULT_NAME = 'New Spectrum ';

/**
 * ZERO_SPECTRUM
 *      Default spectrum to pass to resultant when nothing is selected.
 *      This works because of the nearest-neighbor method in the resultant spectrum. 
 *      Since there is only one x-value, it is the closest x value (which has a y component of 0).
 */
const ZERO_SPECTRUM = [{ x: 0, y: 0 }];

/**
 * addNewSpectrum
 *      Adds a new spectrum to the list of stored spectra.
 * 
 *      Returns: (array) -- the array of recorded spectra. 
 *      Format:
 *      [{
 *          key: 2
 *          name: "Water"
 *          data: [{x: 338.3, y: 44.2}]
 *      }]
 * @param {array} currentArray - the current array of recorded spectra
 * @param {array} data - the spectral data to record in the recorded spectra array
 * @param {string} defaultName - the default prefix to append before the key in naming the specta
 */
export const addNewSpectrum = (currentArray, data, defaultName) => {
    let key = 1;
    if (currentArray.length > 0) {
        key = Math.max(...currentArray.map((ref) => ref.key)) + 1;
    }
    const name = defaultName + key;
    currentArray.push({
        key: key,
        name: name,
        data: data,
    });
    return currentArray;
};

export const spectrumSlice = createSlice({
    name: 'spectra',
    initialState: {
        spectrum: null,
        recorded_spectra: [],
        key_being_used: null,
    },
    reducers: {
        recordSpectrum: (state, action) => {
            // TODO: Verify spectrum is okay. Right now that is only done in the button.
            const data = action.payload.data.data;
            const refs = state.recorded_spectra;
            const recorded = addNewSpectrum(refs, data, DEFAULT_NAME);

            // To automatically use the reference
            state.key_being_used = recorded[recorded.length - 1].key;
            state.is_recording = false;
            state.recorded_spectra = recorded;
        },
        removeSpectrum: (state, action) => {
            const idx = action.payload.targetIndex;
            let recorded = state.recorded_spectra;
            recorded.splice(idx, 1);
            state.recorded_spectra = recorded;
        },
        renameSpectrum: (state, action) => {
            const idx = action.payload.targetIndex;
            const name = action.payload.name;
            let recorded = state.recorded_spectra;
            recorded[idx].name = name;
            state.recorded_spectra = recorded;
        },
    },
});

export const {
    recordSpectrum,
    removeSpectrum,
    renameSpectrum,
} = spectrumSlice.actions;

/**
 * selectValidateCalibrationPoints
 *      Gets the calibration points in the currently used calibration.
 * 
 *      Returns: SpectralDataResponse. If there is data, it looks like this: [CalibrationPoint].
 */
export const selectValidateCalibrationPoints = (state) => {
    const calibrationPoints = selectCalibrationPoints(state).map((point) =>
        point.getPlacementLocationDescription()
    );
    return validateCalibrationPoints(calibrationPoints);
};

/**
 * selectValidateCalibratedPixelLine
 *      Gets the pixel line (raw from the camera source) after validating 
 *      that the data exists to do the calibration. 
 * 
 *      Returns: SpectralDataResponse. If there is data, it looks like this: [{x: 338.3, y: 44.2}].
 */
export const selectValidateCalibratedPixelLine = (state) => {
    const intensities = selectIntensities(state);

    const calibrationPoints = selectValidateCalibrationPoints(state);
    if (!calibrationPoints.isValid()) return calibrationPoints;

    if (!intensities) {
        return new SpectralDataResponse({
            valid: false,
            message: 'Loading...',
        });
    }

    return new SpectralDataResponse({
        valid: true,
        data: getCalibratedSpectrum(intensities, calibrationPoints.getData()),
    });
};

/**
 * selectValidateLiveSpectrum
 *      Get the line graph data to show in the Spectrum component.
 *
 *      Returns: SpectralDataResponse. If there is data, it looks like this: [{x: 338.3, y: 44.2}].
 */
export const selectValidateLiveSpectrum = (state) => {
    // TODO: allow user to view old reference spectra.
    return selectValidateCalibratedPixelLine(state);
};

/**
 * selectReferenceSpectrum
 *      Get the reference spectrum used for creating a resultant spectrum.
 *      This will be what the user has selected, or, a zero-spectrum by default. (just 1 x value which is set to y=0).
 *
 *      Returns: SpectralDataResponse. If there is data, it looks like this: [{x: 338.3, y: 44.2}].
 */
export const selectReferenceSpectrum = (state) => {
    const key = state.spectra.key_being_used;

    // Check if there is a selected spectrum. Otherwise, return a blank reference spectrum.
    if (!key) {
        return new SpectralDataResponse({ valid: true, data: ZERO_SPECTRUM });
    }

    const data = state.spectra.recorded_spectra.find((s) => s.key === key);
    if (!data) {
        console.error("Could not find data at provided key.");
        return new SpectralDataResponse({
            valid: false,
            message: 'Could not find the spectrum. This is a bug, please report this and try again.',
        });
    }

    return new SpectralDataResponse({ valid: true, data: data.data });
};

/**
 * selectRecordedSpectra
 *      Returns (array) -- the list of recorded spectra.
 *      Format:
 *      [{
 *          key: 2
 *          name: "Water"
 *          data: [{x: 338.3, y: 44.2}]
 *      }]
 */
export const selectRecordedSpectra = (state) => {
    return state.spectra.recorded_spectra;
};

export default spectrumSlice.reducer;
