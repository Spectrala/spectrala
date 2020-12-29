import React from 'react';
import { Button } from 'react-bootstrap';
import { serializedState } from '../../store/persistence';
import { downloadToFile } from '../../util/persistence';

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
            variant="link"
            style={{ marginLeft: '0.5em' }}
            onClick={saveAction}
        >
            Save
        </Button>
    );
}
