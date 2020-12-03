import { createSlice } from '@reduxjs/toolkit';
import { selectIntensities } from './video';
import { selectCalibrationPoints } from './calibration/calibration';
import {
    validateCalibrationPoints,
    getCalibratedSpectrum,
} from './calibration/calibration_math';
import {
    Arrow90degLeft,
    ArrowBarLeft,
    TypeUnderline,
} from 'react-bootstrap-icons';

const DEFAULT_NAME = 'Reference Spectrum ';

// TODO: Don't just select from video. Create universal camera source.

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
            const data = action.payload.data;
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

export const selectValidation = (state) => {
    const calibrationPoints = selectCalibrationPoints(state).map((point) =>
        point.getPlacementLocationDescription()
    );
    return validateCalibrationPoints(calibrationPoints);
};

export const validatePixelLine = (state) => {
    const intensities = selectIntensities(state);
    const validation = selectValidation(state);
    if (!validation.valid) return validation;
    if (!intensities) {
        return { valid: false, message: 'Loading...' };
    }
    return {
        valid: true,
        data: getCalibratedSpectrum(
            intensities,
            validation.sortedCalibrationPoints
        ),
    };
};

export const selectRecordingStatus = (state) => {
    return state.reference.is_recording;
};

// While recording, this is for populating the live feed.
export const selectReferenceSpectrumChartData = (state) => {
    if (!state.reference.is_recording) return {
        valid: false,
        message: "Waiting for recording to start."
    }

    return validatePixelLine(state);
};

// If not recording, this is the static reference spectrum to use for the resultant spectrum.
export const selectUsedReferenceSpectrum = (state) => {
    const key = state.reference.key_being_used;

    // Make sure recording has stopped.
    if (state.is_recording) {
        return {
            valid: false,
            message: 'Must finish recording a reference spectrum.',
        };
    }

    // Make sure there is a selected spectrum
    if (!key) {
        return { valid: false, message: 'Must select a reference spectrum.' };
    }

    const data = state.reference.recorded_references.find(s => s.key === key);

    return { valid: true, data: data };
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
