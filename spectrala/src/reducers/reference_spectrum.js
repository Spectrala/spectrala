import { createSlice } from '@reduxjs/toolkit';
import { selectIntensities } from './video';
import { selectCalibrationPoints } from './calibration/calibration';
import {
    validateCalibrationPoints,
    getCalibratedSpectrum,
} from './calibration/calibration_math';
import SpectralDataResponse from './spectral_data_response';

// Default name prefix for saving a reference spectrum. Will start naming as DEFAULT_NAME 1.
const DEFAULT_NAME = 'Reference Spectrum ';

// Default spectrum to pass to resultant when nothing is selected.
const ZERO_SPECTRUM = [{ x: 0, y: 0 }];

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

export const referenceSpectrumSlice = createSlice({
    name: 'reference',
    initialState: {
        spectrum: null,
        recorded_references: [],
        is_recording: true,
        key_being_used: null,
    },
    reducers: {
        record_reference: (state, action) => {
            // TODO: Verify spectrum is okay. Right now that is only done in the button.
            const data = action.payload.data.data;
            const refs = state.recorded_references;
            const recorded = addNewSpectrum(refs, data, DEFAULT_NAME);

            // To automatically use the reference
            state.key_being_used = recorded[recorded.length - 1].key;
            state.is_recording = false;
            state.record_references = recorded;
        },
        remove_reference: (state, action) => {
            const idx = action.payload.targetIndex;
            let recorded = state.recorded_references;
            recorded.splice(idx, 1);
            state.record_references = recorded;
        },
        rename_reference: (state, action) => {
            const idx = action.payload.targetIndex;
            const name = action.payload.name;
            let recorded = state.recorded_references;
            recorded[idx].name = name;
            state.record_references = recorded;
        },
        cancelRecording: (state, action) => {
            state.is_recording = false;
        },
        startRecording: (state, action) => {
            state.is_recording = true;
        },
    },
});

export const {
    record_reference,
    remove_reference,
    rename_reference,
    cancelRecording,
    startRecording,
} = referenceSpectrumSlice.actions;

export const selectValidateCalibrationPoints = (state) => {
    const calibrationPoints = selectCalibrationPoints(state).map((point) =>
        point.getPlacementLocationDescription()
    );
    return validateCalibrationPoints(calibrationPoints);
};

export const selectValidatePixelLine = (state) => {
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

export const selectRecordingStatus = (state) => {
    return state.reference.is_recording;
};

/**
 * selectLiveReferenceSpectrum
 *      Get the line graph data to show in the Reference Spectrum component.
 *      Will only show when recording.
 *
 *      Returns: SpectralDataResponse. If there is data, it looks like this: [{x: 338.3, y: 44.2}].
 */
export const selectLiveReferenceSpectrum = (state) => {
    if (!state.reference.is_recording)
        return new SpectralDataResponse({
            valid: false,
            message: 'Waiting for recording to start.',
        });
    // TODO: allow user to view old reference spectra.
    return selectValidatePixelLine(state);
};

/**
 * selectPreferredReferenceSpectrum
 *      Get the reference spectrum used for creating a resultant spectrum.
 *      This will be what the user has selected, or, a zero-spectrum by default. (just 1 x value which is set to y=0).
 *
 *      Returns: SpectralDataResponse. If there is data, it looks like this: [{x: 338.3, y: 44.2}].
 */
export const selectPreferredReferenceSpectrum = (state) => {
    const key = state.reference.key_being_used;

    // Make sure recording has stopped.
    if (state.is_recording) {
        return new SpectralDataResponse({
            valid: false,
            message: 'Must finish recording a reference spectrum.',
        });
    }

    // Check if there is a selected spectrum. Otherwise, return a blank reference spectrum.
    if (!key) {
        return new SpectralDataResponse({ valid: true, data: ZERO_SPECTRUM });
    }

    const data = state.reference.recorded_references.find((s) => s.key === key);
    if (!data) {
        console.error("Could not find data at provided key.");
        return new SpectralDataResponse({
            valid: false,
            message: 'Could not find the reference spectrum. This is a bug, please report this and try again.',
        });
    }

    return new SpectralDataResponse({ valid: true, data: data.data });
};

/**
 * selectRecordedReferences
 *      Returns (array) -- the list of recorded reference spectra.
 *      Format:
 *      [{
 *          key: 2
 *          name: "Water"
 *          data: [{x: 338.3, y: 44.2}]
 *      }]
 */
export const selectRecordedReferences = (state) => {
    return state.reference.recorded_references;
};

export default referenceSpectrumSlice.reducer;
