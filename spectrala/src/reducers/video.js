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
    },
    reducers: {
        updateFeed: (state, action) => {
            console.log('HEHEHEHEHHEHE');
            state.pixelLine = action.payload.value;
        },
    },
});

export const { updateFeed } = videoSlice.actions;

export const selectIntensities = (state) =>
    state.video.pixelLine.map((obj) => (obj.r + obj.g + obj.b) / 3 / 2.55);

export const selectChartData = (state) => {
    const intensities = selectIntensities(state);
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
