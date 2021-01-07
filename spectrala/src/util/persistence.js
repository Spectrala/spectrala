// naively exports array of columns to CSV format. Currently does no escaping or header detection.
// Attempts to approximate Microsoft Excel CSV format
export const arrayOfColumnsToCSV = (data) => {
    // concept and values stolen from Python stdlib CSV. See there to expand.
    const dialect = {
        delimeter: ',',
        line_terminator: '\r\n',
    };
    const lengths = data.map((c) => c.length);
    if (data.length <= 0 || lengths.find((l) => l !== lengths[0])) {
        // either no data or columns have different lengths
        throw new Error('Invalid CSV data given');
    }
    let csv = '';
    for (let i = 0; i < lengths[0]; i++) {
        for (let j = 0; j < data.length - 1; j++) {
            csv += data[j][i];
            csv += dialect.delimeter;
        }
        // do the last column separately because it doesnt have a trailing delimeter
        csv += data[data.length - 1][i];
        csv += dialect.line_terminator;
    }
    return csv;
};

export const downloadBlob = (blob, filename) => {
    const a = document.createElement('a');

    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
};

// helper to download a file with the given string contents
export const downloadToFile = (content, filename, contentType) => {
    const file = new Blob([content], { type: contentType });
    downloadBlob(file, filename);
};

export const downloadImage = async (ref, filename) => {
    var link = document.createElement('a');
    link.download = filename;
    const url = await ref.current.toDataURL('image/png');
    link.href = url;

    // Don't download an empty image
    if (url === 'data:,') return;
    link.click();
};
