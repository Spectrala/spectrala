import { createSlice } from '@reduxjs/toolkit';

export const widgets = {
    CAMERA: 'camera', // The live image view and the source select above it
    LINE: 'line', // The line that the spectrum is on
    POINTS: 'points', // The point that allow the movement of the line
    CALIB_PTS_CONFIG: 'calib-pts-config', // The "set points" menu without capability to place, but with capability to edit points
    CALIB_PTS_PLACE: 'calib-pts-place', // The "set points" menu stripped of everyhing except ability to place
    CALIB_CHART: 'calib-chart', // The chart to drag the points on
    SPECTRUM_CHART: 'spectrum-chart ', // Chart for viewing spectra with the x values on it
    SPECTRA_TOOL: 'spectra-tool', // The helper menu for creating spectra
    DATA_EXPORT: 'data-export', // The currently non-existent widget for exporting data
};

/**
 * walkthroughConfig:
 *      Defines what is viewed in the bar on the right. Could be a card or a heading.
 *      The card is the one with the shadow, the heading is just the title without the shadow.
 * 
 *      title: (string) the title of each card (or text of the heading)
 *      text: (string) the text to display in the body of an expanded card
 *      isHeading: (bool) if true, this is a heading and not a card
 *      actionIndex: (int) this is the order functioning cards go in. 
 *                         Headings do not have this value.
 *      shows: (string[]) the widgets to render. See the constant 'widgets' for description
 */
export const walkthroughConfig = [
    { title: 'Calibrate Spectrometer', isHeading: true },

    {
        title: 'Set camera source',
        text: 'Lorem ipsum.',
        actionIndex: 0,
        shows: [widgets.CAMERA],
    },

    {
        title: 'Move reader line',
        text: 'Lorem ipsum.',
        actionIndex: 1,
        shows: [widgets.CAMERA, widgets.LINE, widgets.POINTS],
    },

    {
        title: 'Choose calibration type',
        text: 'Lorem ipsum.',
        actionIndex: 2,
        shows: [widgets.CAMERA, widgets.LINE, widgets.CALIB_PTS_CONFIG],
    },

    {
        title: 'Identify known peaks',
        text: 'Lorem ipsum.',
        actionIndex: 3,
        shows: [
            widgets.CAMERA,
            widgets.LINE,
            widgets.CALIB_PTS_PLACE,
            widgets.CALIB_CHART,
        ],
    },

    { title: 'Record Spectra', isHeading: true },

    {
        title: 'Create a reference spectrum',
        text: 'Lorem ipsum.',
        actionIndex: 4,
        shows: [
            widgets.CAMERA,
            widgets.LINE,
            widgets.SPECTRUM_CHART,
            widgets.SPECTRA_TOOL,
        ],
    },

    {
        title: 'Record test spectra',
        text: 'Lorem ipsum.',
        actionIndex: 5,
        shows: [
            widgets.CAMERA,
            widgets.LINE,
            widgets.SPECTRUM_CHART,
            widgets.SPECTRA_TOOL,
        ],
    },

    {
        title: 'Export data',
        text: 'Lorem ipsum.',
        actionIndex: 6,
        shows: [widgets.DATA_EXPORT],
    },
];

const lastActionIndex = () =>
    Math.max(...walkthroughConfig.map((c) => c.actionIndex));

export const isLastActionIndex = (index) => index === lastActionIndex();

export const walkthroughSlice = createSlice({
    name: 'walkthrough',
    initialState: {
        currentActionItem: 3,
    },
    reducers: {
        gotoNextAction: (state) => {
            if (isLastActionIndex(state.currentActionItem)) {
                console.error(
                    'Cannot go to next action, this is last in sequence'
                );
            } else {
                state.currentActionItem += 1;
            }
        },
        rewindToAction: (state, action) => {
            const idx = action.payload.targetIndex;
            if (idx < 0 || idx > state.currentActionItem) {
                console.error(
                    `Cannot jump to action ${idx}, currently on ${state.currentActionItem}`
                );
            } else {
                state.currentActionItem = idx;
            }
        },
    },
});

export const { gotoNextAction, rewindToAction } = walkthroughSlice.actions;

export const selectCurrentActionIndex = (state) =>
    state.walkthrough.currentActionItem;

export const selectCanGotoNextAction = (state) =>
    !isLastActionIndex(selectCurrentActionIndex(state));

export const selectCurrentWalkthroughItem = (state) => {
    const idx = selectCurrentActionIndex(state);
    return walkthroughConfig.find((w) => w.actionIndex === idx);
} 

export default walkthroughSlice.reducer;
