import CalibrationConstants from './calibration_constants';
const calibration_constants = new CalibrationConstants();

export default class CalibrationPoint {
    constructor(wavelength, placement, isBeingPlaced) {
        this.wavelength = wavelength;
        this.placement = placement;
        this.isBeingPlaced = isBeingPlaced;
    }

    getPlacement = () => {
        return this.placement;
    };

    getWavelength = () => {
        return this.wavelength;
    };

    hasBeenPlaced = () => {
        // Has not been placed if value is null.
        return !!this.placement;
    };

    getWavelengthDescription = () => {
        return this.wavelength + 'nm';
    };

    getPlacementLocationDescription = () => {
        if (!this.hasBeenPlaced()) {
            return null;
        }
        return {
            wavelength: this.getWavelengthDescription(),
            placement: this.placement,
        };
    };

    getPlacementStatusDescription = () => {
        return {
            isBeingPlaced: this.isBeingPlaced,
            hasBeenPlaced: this.hasBeenPlaced(),
        };
    };

    setWavelength = (wavelength) => {
        this.wavelength = parseInt(wavelength);
        this.setPlacement(null);
    };

    setPlacementStatus = (beingPlaced) => {
        this.isBeingPlaced = beingPlaced;
    };

    setPlacement = (x) => {
        this.placement = x;
    };

    wavelengthIsValid = () => {
        return (
            !isNaN(this.wavelength) &&
            this.wavelength >= calibration_constants.MINIMUM_WAVELENGTH &&
            this.wavelength <= calibration_constants.MAXIMUM_WAVELENGTH
        );
    };

    wavelengthIsEmpty = () => {
        return this.wavelength === '' || !this.wavelength;
    };

    isValidToPlace = () => {
        return this.wavelengthIsValid();
    }
}