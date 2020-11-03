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
    }

    isCurrentlyPlacing = () => {
        return !!this.getPointBeingPlaced();
    };

    removeOption = (idx) => {
        this.calibrationPoints.splice(idx, 1);
        this.onChange();
    };

    handlePlacement = (xPosition) => {
        console.log(xPosition);
    }

    addOption = () => {
        this.calibrationPoints.push(new CalibrationPoint(null, null, false));
        this.onChange();
    };

    editOption = (idx) => {
        this.calibrationPoints.map((point) => point.setPlacementStatus(false));
        this.calibrationPoints[idx].setPlacementStatus(true);
        this.calibrationPoints[idx].setPlacement(null);
        this.onChange();
    };

    setWavelength = (point, value) => {
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
