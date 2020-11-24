import { serializedState, downloadToFile } from '../../store/persistence';

import React from 'react';
import { Button } from 'react-bootstrap';

export default function SaveButton() {
    const saveAction = () => {
        const serialState = serializedState();
        if (!serialState) return;
        downloadToFile(
            serialState,
            'spectrala_calibration.json',
            'application/json'
        );
    };

    return (
        <Button
            variant="primary"
            style={{ marginLeft: '0.5em', marginRight: '0.5em' }}
            onClick={saveAction}
        >
            Save Calibration
        </Button>
    );
}
