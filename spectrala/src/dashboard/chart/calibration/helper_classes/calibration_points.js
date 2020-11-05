import CalibrationPoint from './calibration_point';

export default class CalibrationPoints {
    constructor(calibrationPoints, onChange) {
        this.calibrationPoints = calibrationPoints;
        this.onChange = onChange;
    }

    length = () => {
        return this.calibrationPoints.length;
    };

    getPointBeingPlaced = () => {
        var pointBeingPlaced = null;
        this.calibrationPoints.forEach((point, idx) => {
            if (point.isBeingPlaced) {
                pointBeingPlaced = point;
            }
        });
        return pointBeingPlaced;
    };

    placePoint = (point, location) => {
        point.setPlacementStatus(false);
        point.setPlacement(location);
        this.onChange();
    };

    getPointIndexThatFallsOnLocation = (location) => {
        var index = null;
        this.calibrationPoints.forEach((point, idx) => {
            if (point.getPlacement() === location) {
                index = idx;
                console.log("Found index")
            }
        });
        return index;
    };

    pointFallsOnLocation = (location) => {
        return !!this.getPointIndexThatFallsOnLocation(location);
    };

    /**
     * isCurrentlyPlacing:
     *  return true if the user is currently attempting to place a marker, false otherwise.
     */
    isCurrentlyPlacing = () => {
        return !!this.getPointBeingPlaced();
    };

    /**
     * removeOption:
     *  delete the calibration point at the specified index.
     * @param {int} idx the index of the option to remove
     */
    removeOption = (idx) => {
        this.calibrationPoints.splice(idx, 1);
        this.onChange();
    };

    /**
     * handleSelection:
     *   respond to a user's click on the calibration graph.
     * @param {float} xPosition the pressed x-location on the graph range [0,1]
     */
    handleSelection = (xPosition) => {
        if (this.isCurrentlyPlacing()) {
            var point = this.getPointBeingPlaced();
            this.placePoint(point, xPosition);
        } else if (this.pointFallsOnLocation(xPosition)) {
            var pointIdx = this.getPointIndexThatFallsOnLocation(xPosition);
            this.editOption(pointIdx);
        }
    };

    /**
     * addOption:
     *   add a blank calibrationPoint to the list
     */
    addOption = () => {
        this.calibrationPoints.push(new CalibrationPoint(null, null, false));
        this.onChange();
    };

    /**
     * editOption:
     *   select a calibration point for editing. This means there was a point
     *   already placed and the user would like to modify it.
     * @param {int} idx index of the calibration point being edited
     */
    editOption = (idx) => {
        this.calibrationPoints.map((point) => point.setPlacementStatus(false));
        this.calibrationPoints[idx].setPlacementStatus(true);
        this.calibrationPoints[idx].setPlacement(null);
        this.onChange();
    };

    /**
     * setWavelength:
     *
     * @param {CalibrationPoint} point the calibration point being set
     * @param {float} value the wavelength value to set the point to.
     */
    setWavelength = (point, value) => {
        /** access the CalibrationPoint method setWavelength, but also use the
         * onChange method for this class. */
        point.setWavelength(value);
        this.onChange();
    };

    getSetPoints = () => {
        var descriptions = [];
        this.calibrationPoints.forEach((point, idx) => {
            const description = point.getPlacementLocationDescription();
            if (description) {
                descriptions.push(description);
            }
        });
        return descriptions;
    };
}
