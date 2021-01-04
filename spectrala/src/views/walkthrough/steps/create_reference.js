import React from 'react';

export default (
    <div>
        The "Spectrum" chart is a live view of the spectrum inside the
        spectrometer. First, give your spectrometer a baseline (or reference
        spectrum) by using plain water inside a cuvette.
        <ol type="1">
            <li>
                Place a cuvette filled with uncontaminated water into the
                spectrometer and select the "Capture" button. This will save a
                map of intensity to wavelength and insert it into the "Saved
                spectra" menu.
            </li>
            <li>
                Rename the spectrum from "New spectrum" to something meaningful
                (like "water").
            </li>
            <li>
                Identify the sample as a reference spectrum by clicking the
                dropdown to the right of the recorded spectrum in the "Saved
                spectra" menu and selecting "Use as reference."
            </li>
        </ol>
        This will allow for the calculation of transmittance and absorbance for
        future spectra according to Beer's law.
    </div>
);
