import CalibrationPoint from './calibration_point';

export default class CalibrationPoints {
    constructor(calibrationPoints, onChange) {
        this.calibrationPoints = calibrationPoints;
        this.onChange = onChange;
    }

    length = () => {
        return this.calibrationPoints.length;
    };

    isCurrentlyPlacing = () => {
        var isPlacing = false;
        this.calibrationPoints.map((point, idx) => {
            if (point.isBeingPlaced) {
                isPlacing = true;
            }
            return null;
        });
        return isPlacing;
    };

    removeOption = (idx) => {
        this.calibrationPoints.splice(idx, 1);
        this.onChange();
    };

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
}
