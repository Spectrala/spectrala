import { createSlice } from '@reduxjs/toolkit';
import { selectIntensities } from './video';
import { selectCalibrationPoints } from './calibration/calibration';
import {
    validateCalibrationPoints,
    getCalibratedSpectrum,
} from './calibration/calibration_math';

const DEFAULT_NAME = "Reference Spectrum "

export const referenceSpectrumSlice = createSlice({
    name: 'reference',
    initialState: {
        spectrum: null,
        recorded_references: [],
    },
    reducers: {
        record_reference: (state, action) => {
            // TODO: Verify spectrum is okay. Right now that is only done in the button.
            var recorded = state.recorded_references;
            var key = 1;
            if (recorded.length > 0) {
                key = Math.max(...recorded.map((ref) => ref.key)) + 1;
            }
            const name = DEFAULT_NAME + key;
            const data = action.payload.data;
            recorded.push({
                key: key,
                name: name,
                data: data,
            });
            state.record_references = recorded;
        },
        remove_reference: (state, action) => {
            const idx = action.payload.targetIndex;
            var recorded = state.recorded_references;
            recorded.splice(idx, 1);
            state.record_references = recorded;
        },
        rename_reference: (state, action) => {
            const idx = action.payload.targetIndex;
            const name = action.payload.name;
            var recorded = state.recorded_references;
            recorded[idx].name = name;
            state.record_references = recorded;
        },
    },
});

export const {
    record_reference,
    remove_reference,
    rename_reference,
} = referenceSpectrumSlice.actions;

export const selectValidation = (state) => {
    const calibrationPoints = selectCalibrationPoints(state).map((point) =>
        point.getPlacementLocationDescription()
    );
    return validateCalibrationPoints(calibrationPoints);
}

export const selectReferenceSpectrumChartData = (state) => {
    const intensities = selectIntensities(state);
    const validation = selectValidation(state);
    if (!validation.valid) {
        const failureMessage = validation.message;
        return failureMessage;
    }
    return getCalibratedSpectrum(
        intensities,
        validation.sortedCalibrationPoints
    );
};

export const selectRecordedReferences = (state) => {
    return state.reference.recorded_references;
};

export default referenceSpectrumSlice.reducer;
