import CameraFeed from './camera_feed';
import CalibrationFeed from './calibration_feed';

/**
 * This class should have access to:
 *  - a data feed from the camera interface
 *  - the calibration (stores the map of x-position to wavelength)
 * It will use this to maintain a data feed for the spectrum.
 */

export default class MasterFeed {
    constructor(preferences, onChange) {
        this.cameraFeed = new CameraFeed(preferences.refreshRate, this.onCameraChange);
        this.calibration = new CalibrationFeed();
        this.onSpectralGraphChange = onChange
    }

    feedSpectralGraphToParent = () => {
        this.onSpectralGraphChange()
    }

    onCameraChange = (array) => {
        console.log('MasterFeed.onCameraChange - Smile for the camera.');
        
    };

}
