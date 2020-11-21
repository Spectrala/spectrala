import { createSlice } from '@reduxjs/toolkit';

/**
 * videoSlice variables
 *
 * The variable we care about here the most is pixelLine, which is an array
 * of objects representing each pixel along the line defined by the user.
 * The pixel line is of the form [{r: 233.0, g: 30.2, b: 2.9, a: 1.0 }, ...]
 *
 * Selectors can choose how they export this data to something more useful for other classes.
 */
export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        pixelLine: null,
        lineCoords: {
            lowX: 0.1,
            lowY: 0.5,
            highX: 0.9,
            highY: 0.5,
        },
    },
    reducers: {
        updateFeed: (state, action) => {
            state.pixelLine = action.payload.value;
        },
        updateLineCoords: (state, action) => {
            state.lineCoords[action.payload.targetKey] = action.payload.value;
        }
    },
});

export const { updateFeed, updateLineCoords } = videoSlice.actions;

export const selectIntensities = (state) => {
    const pixels = state.video.pixelLine
    if (pixels) {
        return pixels.map((obj) => (obj.r + obj.g + obj.b) / 3 / 2.55);
    }
    return null;
}

export const selectLineCoords = (state) => state.video.lineCoords; 

export const selectChartData = (state) => {
    const intensities = selectIntensities(state);
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

export default videoSlice.reducer;
