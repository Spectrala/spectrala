export default class CalibrationPoint {
    constructor(wavelength, placement, isBeingPlaced) {
        this.wavelength = wavelength;
        this.placement = placement;
        this.isBeingPlaced = isBeingPlaced;
    }

    getPlacement = () => {
        return this.placement;
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
        if (this.isBeingPlaced) {
            return 'Placing';
        } else if (this.hasBeenPlaced()) {
            return 'Done';
        }
        return 'Place';
    };

    setWavelength = (wavelength) => {
        this.wavelength = wavelength;
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
            this.wavelength >= 300 &&
            this.wavelength <= 800
        );
    };
}
