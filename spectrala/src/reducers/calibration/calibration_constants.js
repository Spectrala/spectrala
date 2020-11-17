import CalibrationPoints from './calibration_points';
import CalibrationPoint from './calibration_points';
export const MINIMUM_WAVELENGTH = 300;
export const MAXIMUM_WAVELENGTH = 800;
export const calibrationPresetsOrder = ['custom', 'cfl'];

export const calibrationPresets = {
    custom: {
        title: 'Custom',
        value: new CalibrationPoints([
            new CalibrationPoint(0, null, false),
            new CalibrationPoint(0, null, false),
        ]),
    },
    cfl: {
        title: 'CFL Bulb',
        value: new CalibrationPoints([
            new CalibrationPoint(303, null, false),
            new CalibrationPoint(421, null, false),
        ]),
    },
};


// TODO: Learn what to actually do with this default export.
export default null;
