

export default class CalibrationPoint {

    constructor(wavelength, placement, isBeingPlaced) {
        this.wavelength = wavelength;
        this.placement = placement;
        this.isBeingPlaced = isBeingPlaced;
    }


    hasBeenPlaced = () => {
        // Has not been placed if value is null.
        return !!this.placement;
    };

    getDescription = () => {
        if (this.isBeingPlaced) {
            return 'Placing';
        } else if (this.hasBeenPlaced()) {
            return 'Done';
        }
        return 'Place';
    };

    setWavelength = (wavelength) => {
        this.wavelength = wavelength
        this.setPlacement(null)
    }

    setPlacementStatus = (beingPlaced) => {
        this.isBeingPlaced = beingPlaced
    }

    setPlacement = (x) => {
        this.placement = x
    }

    wavelengthIsValid = () => {
        return !isNaN(this.wavelength) && this.wavelength >= 300 && this.wavelength <= 800 
    }
}
