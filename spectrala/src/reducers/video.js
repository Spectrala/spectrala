import { createSlice } from '@reduxjs/toolkit';

// Samples included in the moving average
const PIXEL_LINE_HISTORY_DEPTH = 5;

// Look for absolute maximum, and don't do this in video. this should be raw input.
const OVERSATURATION_CEILING = 98;
const isNotOversaturated = (val) => val < OVERSATURATION_CEILING;

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
        pixelLineHistory: [],
        isOversaturated: false,
        lineCoords: {
            lowX: 0.1,
            lowY: 0.5,
            highX: 0.9,
            highY: 0.5,
        },
    },
    reducers: {
        updateFeed: (state, action) => {
            const newline = action.payload.value;
            let lineHist = state.pixelLineHistory;
            /**
             * Sort of stupid coding but this maintains a history of a certain length
             * of pixel values in order to create a moving average of intensities.
             * There's obvious uncertainty when looking at the static bounce around.
             * Smoothing this out is better for UX and scientific accuracy.
             */
            if (lineHist.length > 0) {
                if (lineHist[0].length === newline.length) {
                    if (lineHist.length >= PIXEL_LINE_HISTORY_DEPTH)
                        lineHist = lineHist.slice(
                            PIXEL_LINE_HISTORY_DEPTH - lineHist.length + 1
                        );
                    lineHist.push(newline);
                } else {
                    lineHist = [newline];
                }
            } else {
                lineHist = [newline];
            }
            state.pixelLineHistory = lineHist;

            /**
             * Detect oversaturation
             */
            state.isOversaturated = !newline.every(isNotOversaturated);
        },
        updateLineCoords: (state, action) => {
            state.lineCoords[action.payload.targetKey] = action.payload.value;
        },
    },
});

export const { updateFeed, updateLineCoords } = videoSlice.actions;

export const selectIntensities = (state) => {
    const pixels = state.video.pixelLineHistory;
    if (pixels && pixels.length > 0) {
        const pixelLines = pixels.map((line) =>
            line.map((obj) => (obj.r + obj.g + obj.b) / 3 / 2.55)
        );
        var averagedLine = [];
        const len = pixelLines[0].length;

        // TODO: Fix "Unsafe" nature of "i" variable in the closure.
        for (var i = 0; i < len; i++) {
            averagedLine.push(
                pixelLines.map((line) => line[i]).reduce((a, b) => a + b, 0) /
                    pixelLines.length
            );
        }
        return averagedLine;
    }
    return null;
};

export const selectOversaturation = (state) => state.video.isOversaturated;

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
