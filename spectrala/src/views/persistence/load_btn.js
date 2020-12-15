import { recreateUsingState } from '../../store/persistence';

import React from 'react';
import { Button } from 'react-bootstrap';

export default function LoadButton() {
    const loadAction = () => {
        async function reloadFromFile() {
            const picker = document.createElement('input');
            picker.type = 'file';
            picker.accept = 'application/json';
            const filePromise = new Promise((resolve, reject) => {
                picker.addEventListener('change', (e) => {
                    resolve(e.target.files[0]);
                });
            });
            picker.click();
            let file = await filePromise;
            const reader = new FileReader();
            const content = await new Promise((resolve, reject) => {
                reader.onload = (evt) => resolve(evt.target.result);
                reader.onerror = (err) => reject(err);
                reader.readAsText(file);
            });
            const data = JSON.parse(content);

            console.log(`loadAction data: ${data}`);
            recreateUsingState(data);
        }
        reloadFromFile();
    };

    return (
        <Button
            variant="outline-primary"
            style={{ marginLeft: '0.5em', marginRight: '0.5em' }}
            onClick={loadAction}
        >
            Load Calibration
        </Button>
    );
}
