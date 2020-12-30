import { downloadToFile, arrayOfColumnsToCSV } from './persistence';
import { computeTransmittance, computeAbsorbance } from '../reducers/spectrum';
export const downloadSpectrum = (recordedSpectra, targetIndex) => {
    const idx = targetIndex;
    const this_spectra = recordedSpectra[idx];
    const reference_spectrum = recordedSpectra.find((s) => s.isReference);
    const wavelength = ['wavelength_nm'].concat(
        this_spectra.data.map((pt) => pt.x)
    );
    const intensity = ['intensity_pct'].concat(
        this_spectra.data.map((pt) => pt.y)
    );
    let csv_columns = [wavelength, intensity];
    // TODO: Only include transmittance/absorbance for spectra that aren't the reference spectrum.
    if (reference_spectrum) {
        // TODO: computeAbsorbence/transmittance use nearest-neighbor;
        // if calibration is way different, this will be way off. We should warn the user.
        csv_columns.push(
            ['transmittance_pct'].concat(
                computeTransmittance(
                    this_spectra.data,
                    reference_spectrum.data
                ).map((pt) => pt.y)
            )
        );
        csv_columns.push(
            ['absorbance'].concat(
                computeAbsorbance(
                    this_spectra.data,
                    reference_spectrum.data
                ).map((pt) => pt.y)
            )
        );
    }

    downloadToFile(
        arrayOfColumnsToCSV(csv_columns),
        this_spectra.name + '.csv',
        'text/csv'
    );
};

export const downloadAllSpectra = (recordedSpectra) => {
    // TODO: Convert to downloading a folder, zipped
    recordedSpectra.forEach((_, idx) => downloadSpectrum(recordedSpectra, idx));
};
