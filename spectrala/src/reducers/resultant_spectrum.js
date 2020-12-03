import { createSlice } from '@reduxjs/toolkit';
import {
    selectPreferredReferenceSpectrum,
    selectValidatePixelLine,
    addNewSpectrum,
} from './reference_spectrum';

// Default name prefix for saving a resultant spectrum. Will start naming as DEFAULT_NAME 1.
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

// TODO: make this look professional 
// get nearest neighbor (in x position) to a parent x value of neighborArray and return the neighborArray y value. 
const getNeighborY = (parentX, neighborArray) => {
    console.log(neighborArray);
    const closest = neighborArray.reduce((a, b) => {
        return Math.abs(a.x - parentX) < Math.abs(b.X - parentX) ? a : b;
    });
    return closest.y
};

export const canDisplayLiveSpectrum = (state) => {
    // Must not be recording reference.
    // Must be using a reference spectrum.
    let reference = selectPreferredReferenceSpectrum(state);
    const pixelLine = selectValidatePixelLine(state);

    if (!reference.isValid()) return reference;
    if (!pixelLine.isValid()) return pixelLine;
    const data = pixelLine.data;
    reference = reference.data;

    return {
        valid: true,
        data: data.map((val, idx) => {
            return {
                x: val.x,
                y: val.y - getNeighborY(val.x, reference),
            };
        }),
    };
};

export const selectResultantSpectrum = (state) => {
    const validation = canDisplayLiveSpectrum(state);
    if (!validation.isValid()) {
        const failureMessage = validation.message;
        return failureMessage;
    }
    return validation.data;
};

export const selectRecordedResultants = (state) => {
    return state.resultant.recorded_resultants;
};

export default resultantSpectrumSlice.reducer;
