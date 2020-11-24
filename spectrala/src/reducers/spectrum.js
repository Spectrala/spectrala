import { createSlice } from '@reduxjs/toolkit';


export const spectrumSlice = createSlice({
    name: 'spectrum',
    initialState: {
        spectrum: null,
    },
    reducers: {
        helloWorld: (state, action) => {
            const target = action.payload.targetIndex;
        },
    },
});

export const { helloWorld } = adjustmentsSlice.actions;


export const selectSpectrum = (state, target) => {
    state.adjustments.adjustments[target];
}


export default adjustmentsSlice.reducer;
