import React from 'react';
import { WalkthroughItem } from './walkthrough_card';

const config = [
    { title: 'Calibrate Spectrometer', isHeading: true },
    {
        title: 'Set camera source',
        expanded: true,
        text:
            'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.\nLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.',
    },
    { title: 'Move reader line', expanded: false },
    { title: 'Choose calibration type', expanded: false },
    { title: 'Identify known peaks', expanded: false },

    { title: 'Record Spectra', isHeading: true },
    { title: 'Create a reference spectrum', expanded: false },
    { title: 'Record test spectra', expanded: false },
    { title: 'Export data', expanded: false },
];

export const Walkthrough = () => {
    return (
        <>
            {config.map((props, idx) => {
                return <div key={idx}>{WalkthroughItem(props)}</div>;
            })}
        </>
    );
};

export default null;
