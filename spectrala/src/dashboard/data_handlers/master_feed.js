import CameraFeed from './camera_feed';
import CalibrationFeed from './calibration_feed';

/**
 * This class should have access to:
 *  - a data feed from the camera interface
 *  - the calibration (stores the map of x-position to wavelength)
 * It will use this to maintain a data feed for the spectrum.
 */

export default class MasterFeed {
    constructor() {
        const refreshRate = 1;
        this.cameraFeed = new CameraFeed(refreshRate);
        this.calibration = new CalibrationFeed();
    }
}
