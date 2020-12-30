import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { renameSpectrum, selectRecordedSpectra} from '../../reducers/spectrum';
import { downloadSpectrum } from '../../util/download';
import theme from '../theme/theme';

function ExportCell({ key: idx, name, style }) {
    const recordedSpectra = useSelector(selectRecordedSpectra);

    const dispatch = useDispatch();
    const defaultStyle = {};

    const onTextEdit = useCallback(
        (value, idx) => {
            dispatch(
                renameSpectrum({
                    targetIndex: idx,
                    name: value,
                })
            );
        },
        [dispatch]
    );

    return (
        <Form className="mb-3" key={idx} style={{ ...style, defaultStyle }}>
            <InputGroup>
                {/* <InputGroup.Prepend>{prepend}</InputGroup.Prepend> */}

                <Form.Control
                    value={name}
                    aria-label={`Spectrum ${idx}`}
                    aria-describedby="basic-addon2"
                    onChange={(event) => onTextEdit(event.target.value, idx)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) e.preventDefault();
                    }}
                />

                <InputGroup.Append>
                    <Button
                        variant="outline-dark"
                        title="Individual download"
                        aria-label="Individual download"
                        style={{ backgroundColor: theme.background }}
                    >
                        <Download onClick={() => downloadSpectrum(recordedSpectra, idx)} />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    );
}

ExportCell.propTypes = {
    key: PropTypes.number,
};

export default ExportCell;
