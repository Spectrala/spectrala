import React from 'react';

export default (
    <div>
        Procedure
        <ol type="1">
            <li>
                Use the "Place" button to the left of each of the points you
                configured in the previous section. This will select a
                wavelength to be identified.
            </li>
            <li>
                Click the location on the graph with the highest intensity
                corresponding to the selected wavelength. Wavelengths must be
                placed in ascending order.
            </li>
            <li>
                If necessary, edit points that have been placed using the pencil
                button on the right.
            </li>
        </ol>
        <details>
            <summary>Notes on providing the light source </summary>
            Using a CFL bulb will create multiple peaks at the same time which
            can all be identified at once, while flashing a single colored LED
            should only create a single peak. If using LEDs, it is an option to
            flash them one at a time and individually identify the peak
            intensity for each wavelength.
        </details>
        <details>
            <summary>What does this step do? </summary>
            The "Calibration" graph represents pixel intensities across the
            reader line. The purpose of calibration is to assign a meaningful
            x-axis to this graph, which will be wavelength (in nanometers).
            Without this step, intensities could only be mapped to their
            location on the line (from 0% to 100%).
        </details>
    </div>
);
