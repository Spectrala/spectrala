import SpectralDataResponse from '../spectral_data_response';

export const validateCalibrationPoints = (calibrationPoints) => {
    // Make sure all points are placed.
    const noNulls = calibrationPoints.every(
        (p) => p && p.rawWavelength && p.placement
    );
    if (!noNulls)
        return new SpectralDataResponse({
            valid: false,
            message:
                'All calibration points must be placed before creating a spectrum.',
        });

    // Make sure there are at least 2 points.
    if (calibrationPoints.length < 2)
        return new SpectralDataResponse({
            valid: false,
            message:
                'Waiting for at least two calibratin points to create a spectrum.',
        });

    // Sort the calibration points by wavelength
    const sortedPoints = calibrationPoints.sort(
        (a, b) => a.rawWavelength - b.rawWavelength
    );

    // Verify these points are also sorted by placement
    for (var i = 0; i < sortedPoints.length - 1; i++) {
        if (sortedPoints[i + 1].placement < sortedPoints[i].placement)
            return new SpectralDataResponse({
                valid: false,
                message: 'Calibration points must go in order of wavelength.',
            });
    }

    return new SpectralDataResponse({ valid: true, data: sortedPoints });
};

export const getCalibratedSpectrum = (intensities, sortedCalibrationPoints) => {
    const point_a = sortedCalibrationPoints[0];
    const point_b = sortedCalibrationPoints[sortedCalibrationPoints.length - 1];
    const cartesian = (point) => {
        return { x: point.placement, y: point.rawWavelength };
    };

    const a = cartesian(point_a);
    const b = cartesian(point_b);
    const m = (b.y - a.y) / (b.x - a.x);
    const w_end = (x) => m * (x - a.x) + b.y;

    if (!intensities) {
        console.warn('Got null intensities');
        return;
    }

    return intensities.map((y, idx) => {
        const x_position = idx / (intensities.length - 1);
        return {
            x: w_end(x_position),
            y: y,
        };
    });
};
