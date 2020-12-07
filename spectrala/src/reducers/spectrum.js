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
 * FULL_SPECTRUM
 *      Default spectrum to pass to resultant when nothing is selected.
 *      This works because of the nearest-neighbor method in the resultant spectrum.
 *      Since there is only one x-value, it is the closest x value (which has a y component of 0).
 */
const FULL_SPECTRUM = [{ x: 0, y: 1 }];

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
        isReference: false,
    });
    return currentArray;
};

export const setIsReferenceFalse = (currentArray) => {
    return currentArray.map((pt) => {
        let newObj = Object.assign({}, pt);
        newObj.isReference = false;
        return newObj;
    });
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
        removeReference: (state, action) => {
            state.recorded_spectra = setIsReferenceFalse(
                state.recorded_spectra
            );
        },
        setReference: (state, action) => {
            const idx = action.payload.targetIndex;
            let recorded = setIsReferenceFalse(state.recorded_spectra);
            recorded[idx].isReference = true;
            state.recorded_spectra = recorded;
        },
        downloadSpectrum: (state, action) => {
            const idx = action.payload.targetIndex;
            const spectrum = state.recorded_spectra[idx];
            console.log('DOWNLOAD');
        },
    },
});

export const {
    recordSpectrum,
    removeSpectrum,
    renameSpectrum,
    removeReference,
    setReference,
    downloadSpectrum,
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
    const pixelLine = selectValidateCalibratedPixelLine(state);
    if (!pixelLine.valid) return pixelLine;
    const data = pixelLine.data;
    const ref = selectReferenceAbsorbance(state);
    const intensity = computeIntensity(data, ref);

    return new SpectralDataResponse({
        valid: true,
        data: intensity,
    });
};

/**
 * selectReferenceAbsorbance
 *      Get the absorbance values of the reference spectrum used for creating a resultant spectrum.
 *      This will be what the user has selected, or, a ones-spectrum by default. (just 1 x value which is set to y=1).
 *
 *      Returns: array. Data looks like this: [{x: 338.3, y: 44.2}].
 */
export const selectReferenceAbsorbance = (state) => {
    const reference = state.spectra.recorded_spectra.filter(
        (s) => s.isReference
    );
    if (reference.length === 0) {
        return FULL_SPECTRUM;
    }
    return reference[0].data;
};

// TODO: make this look professional
// get nearest neighbor (in x position) to a parent x value of neighborArray and return the neighborArray y value.
const getNeighborY = (parentX, neighborArray) => {
    const closest = neighborArray.reduce((a, b) => {
        return Math.abs(a.x - parentX) < Math.abs(b.X - parentX) ? a : b;
    });
    return closest.y;
};

export const computeIntensity = (target, reference) => {
    let intensity = target.map((t) => {
        const r = getNeighborY(t.x, reference);
        const intensity = r === 0 ? 0 : t.y / r;
        return { x: t.x, y: intensity };
    });
    return intensity;
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
