import {
    downloadToFile,
    downloadBlob,
    arrayOfColumnsToCSV,
} from './persistence';
import { computeTransmittance, computeAbsorbance } from '../reducers/spectrum';
import JSZip from 'jszip';

const spectraToCsv = (recordedSpectra, targetIndex) => {
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

    return {
        filename: this_spectra.name + '.csv',
        content: arrayOfColumnsToCSV(csv_columns),
    };
};

export const downloadSpectrum = (recordedSpectra, targetIndex) => {
    const { filename, content } = spectraToCsv(recordedSpectra, targetIndex);
    downloadToFile(content, filename, 'text/csv');
};

export const downloadAllSpectra = (recordedSpectra) => {
    // Save all spectra into a single zip file
    const zip = new JSZip();
    debugger;
    recordedSpectra.forEach((_, idx) => {
        const { filename, content } = spectraToCsv(recordedSpectra, idx);
        zip.file(filename, content);
    });
    let run_download = async () => {
        const blob = await zip.generateAsync({
            type: 'blob',
            compression: 'STORE', // no compression
            comment: 'Spectrala Download Zip',
        });
        downloadBlob(blob, 'spectrala_all.zip');
    };
    run_download();
};
