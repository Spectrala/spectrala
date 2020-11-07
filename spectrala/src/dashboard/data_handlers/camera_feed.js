/**
 * This is a class that will be responsible for serving arrays
 * representing pixels across a line of interest.
 */

export default class CameraFeed {
    constructor(refreshRate, onChange) {
        this.refreshRate = refreshRate;
        this.onChange = onChange;
    }
}
