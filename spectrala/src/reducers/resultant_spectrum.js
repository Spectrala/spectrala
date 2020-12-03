import { createSlice } from '@reduxjs/toolkit';
import { selectIntensities } from './video';
import { selectCalibrationPoints } from './calibration/calibration';
import {
    validateCalibrationPoints,
    getCalibratedSpectrum,
} from './calibration/calibration_math';
import {
    selectUsedReferenceSpectrum,
    selectFromStream,
    addNewSpectrum,
} from './reference_spectrum';
import { TypeUnderline } from 'react-bootstrap-icons';

const DEFAULT_NAME = 'Resultant Spectrum ';

/**
 * Compute the resultant spectrum from the current camera input and the reference spectrum. Simple subtraction.
 * Save resultant spectra
 */
export const resultantSpectrumSlice = createSlice({
    name: 'resultant',
    initialState: {
        spectrum: null,
        recorded_resultants: [],
    },
    reducers: {
        record_resultant: (state, action) => {
            const data = action.payload.data;
            const refs = state.recorded_resultants;
            const recorded = addNewSpectrum(refs, data, DEFAULT_NAME);
            state.recorded_resultants = recorded;
        },
        remove_resultant: (state, action) => {
            const idx = action.payload.targetIndex;
            let recorded = state.recorded_resultants;
            recorded.splice(idx, 1);
            state.record_resultants = recorded;
        },
        rename_resultant: (state, action) => {
            const idx = action.payload.targetIndex;
            const name = action.payload.name;
            let recorded = state.recorded_resultants;
            recorded[idx].name = name;
            state.record_resultants = recorded;
        },
    },
});

export const {
    record_resultant,
    remove_resultant,
    rename_resultant,
} = resultantSpectrumSlice.actions;

export const canDisplayLiveSpectrum = (state) => {
    // Must not be recording reference.
    // Must be using a reference spectrum.
    const reference = selectUsedReferenceSpectrum(state);
    const data = selectFromStream(state);

    if (!reference.valid) return reference;

    return {
        valid: true,
        data: data.map((val, idx) => {
            return {
                x: val.x,
                y: val.y - reference[idx].y,
            };
        })
    };
};

export const selectResultantFromStream = (state) => {
    const validation = canDisplayLiveSpectrum(state);
    if (!validation.valid) {
        const failureMessage = validation.message;
        return failureMessage;
    }
    return validation.data;
};

export const selectResultantSpectrumChartData = (state) => {
    // TODO: probably don't want this all the time.

    // if (isRecording)
    return selectResultantFromStream(state);
};

export const selectRecordedResultants = (state) => {
    return state.resultant.recorded_resultants;
};

export default resultantSpectrumSlice.reducer;
