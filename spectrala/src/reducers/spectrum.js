import { createSlice } from '@reduxjs/toolkit';
import { selectIntensities } from './video';

export const spectrumSlice = createSlice({
    name: 'spectrum',
    initialState: {
        spectrum: null,
    },
    reducers: {
        helloWorld: (state, action) => {
            const target = action.payload.targetIndex;
            return null;
        },
    },
});

export const { helloWorld } = spectrumSlice.actions;


export const selectSpectrum = (state, target) => {
    const f = state.calibration.adjustments[target];
    return null;
}

export const selectSpectrumIntensities = (state) => {
    var chartData = selectIntensities(state);
    if (!chartData)  return null;
    return chartData.map((x) => 100-x);
}


export const selectSpectrumChartData = (state) => {
    const intensities = selectSpectrumIntensities(state);
    if (!intensities) {
        return null;
    }
    return [
        {
            id: 'spectrum',
            color: '#00873E',
            data: intensities.map((y, idx) => {
                return {
                    x: idx / (intensities.length - 1),
                    y: y,
                };
            }),
        },
    ];
};



export default spectrumSlice.reducer;
