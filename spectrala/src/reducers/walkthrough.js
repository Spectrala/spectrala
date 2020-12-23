import { createSlice } from '@reduxjs/toolkit';

export const walkthroughConfig = [
    { title: 'Calibrate Spectrometer', isHeading: true },

    {
        title: 'Set camera source',
        text: 'Lorem ipsum.',
        actionIndex: 0,
        shows: ['camera'],
    },

    {
        title: 'Move reader line',
        text: 'Lorem ipsum.',
        actionIndex: 1,
        shows: ['camera', 'line', 'points'],
    },

    {
        title: 'Choose calibration type',
        text: 'Lorem ipsum.',
        actionIndex: 2,
        shows: ['camera', 'line', 'calib-pts-config'],
    },

    {
        title: 'Identify known peaks',
        text: 'Lorem ipsum.',
        actionIndex: 3,
        shows: ['camera', 'line', 'calib-pts-place', 'calib-chart'],
    },

    { title: 'Record Spectra', isHeading: true },

    {
        title: 'Create a reference spectrum',
        text: 'Lorem ipsum.',
        actionIndex: 4,
        shows: ['camera', 'line', 'spectrum-chart', 'spectra-tool'],
    },

    {
        title: 'Record test spectra',
        text: 'Lorem ipsum.',
        actionIndex: 5,
        shows: ['camera', 'line', 'spectrum-chart', 'spectra-tool'],
    },

    {
        title: 'Export data',
        text: 'Lorem ipsum.',
        actionIndex: 6,
        shows: ['data-export'],
    },
];

const lastActionIndex = () =>
    Math.max(...walkthroughConfig.map((c) => c.actionIndex));

export const isLastActionIndex = (index) => index === lastActionIndex();

/**
 * interfaceOrder: An array to define the order in which to display the adjustment sliders.
 */
export const interfaceOrder = ['brightness', 'contrast', 'hue', 'saturation'];

export const walkthroughSlice = createSlice({
    name: 'walkthrough',
    initialState: {
        currentActionItem: 0,
    },
    reducers: {
        gotoNextAction: (state) => {
            if (isLastActionIndex(currentActionItem)) {
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

export const { setValue, setDefault } = adjustmentsSlice.actions;

export const selectCurrentActionIndex = (state) =>
    state.walkthrough.currentActionItem;

export const canGotoNextAction = (state) =>
    !isLastActionIndex(selectCurrentActionIndex(state));

export default walkthroughSlice.reducer;
