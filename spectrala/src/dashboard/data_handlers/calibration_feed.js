import CalibrationPoints from '../chart/calibration/helper_classes/calibration_points';
import CalibrationPoint from '../chart/calibration/helper_classes/calibration_point';

/**
 * This is a class that is responsible for storing and serving a
 * calibration, which maps a given x from the camera stream to a wavelength
 * based on stored x-position/wavelength pairs
 */

export default class CalibrationFeed {
    /**
     * Superclasses do not care about calibration, only the map for x position -> wavelength
     */
    constructor(onChange) {
        const calibrationPoints = new CalibrationPoints(
            [
                new CalibrationPoint(303, 0.3670886075949367, false),
                new CalibrationPoint(421, null, true),
            ],
            () => this.onCalibrationPointChange()
        );
        this.calibrationPoints = calibrationPoints
        this.onChange = onChange
    }
}
