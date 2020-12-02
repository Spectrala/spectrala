import CalibrationPoint from './calibration_point';
export const MINIMUM_WAVELENGTH = 300;
export const MAXIMUM_WAVELENGTH = 800;
export const calibrationPresetsOrder = ['custom', 'cfl'];

export const calibrationPresets = {
    custom: {
        title: 'Custom',
        value: [
            new CalibrationPoint(0, null, false),
            new CalibrationPoint(0, null, false),
        ],
    },
    cfl: {
        title: 'CFL Bulb',
        value: [
            new CalibrationPoint(303, 0.2, false),
            new CalibrationPoint(421, 0.4, false),
        ],
    },
};


// TODO: Learn what to actually do with this default export.
export default null;
