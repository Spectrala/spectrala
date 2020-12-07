import React from 'react';
import {
    InputGroup,
    Button,
    Form,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap';
import { XCircle, Droplet } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
    renameSpectrum,
    selectRecordedSpectra,
    removeSpectrum,
    removeReference,
    setReference,
    downloadSpectrum,
} from '../../../reducers/spectrum';

export default function SpectrumControl({ height }) {
    const dispatch = useDispatch();
    const recordedSpectra = useSelector(selectRecordedSpectra);

    function getActionDropdown(spectrum, idx) {
        return (
            <DropdownButton
                title=""
                as={InputGroup.Append}
                variant="outline-secondary"
                id="collasible-nav-dropdown"
                key={`more_${idx}`}
            >
                <Dropdown.Item
                    key={'reference'}
                    onClick={() => {
                        spectrum.isReference
                            ? dispatch(removeReference())
                            : dispatch(setReference({ targetIndex: idx }));
                    }}
                >
                    {spectrum.isReference
                        ? 'Unset reference'
                        : 'Use as reference'}
                </Dropdown.Item>

                <Dropdown.Item
                    key={'download'}
                    onClick={() => {
                        dispatch(downloadSpectrum({ targetIndex: idx }));
                    }}
                >
                    Download as CSV
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item
                    key={'delete'}
                    onClick={() => {
                        dispatch(
                            removeSpectrum({
                                targetIndex: idx,
                            })
                        );
                    }}
                >
                    Delete Spectrum
                </Dropdown.Item>
            </DropdownButton>
        );
    }

    function getCells() {
        return (
            <>
                <div style={{ height: '15px' }} />
                {recordedSpectra.map((point, idx) => {
                    return (
                        <Form
                            className="mb-3"
                            key={`spectrum_options_${idx}`}
                            style={{
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                display: 'flex',
                            }}
                        >
                            <InputGroup>
                                <InputGroup.Prepend>
                                    {point.isReference ? (
                                        <InputGroup.Text>
                                            <Droplet
                                                style={{
                                                    display: 'flex',
                                                    alignSelf: 'flex-center',
                                                }}
                                            />
                                        </InputGroup.Text>
                                    ) : null}
                                </InputGroup.Prepend>
                                <Form.Control
                                    value={point.name ? point.name : ''}
                                    aria-label={`Calibration point ${idx + 1}`}
                                    aria-describedby="basic-addon2"
                                    onChange={(event) => {
                                        dispatch(
                                            renameSpectrum({
                                                targetIndex: idx,
                                                name: event.target.value,
                                            })
                                        );
                                    }}
                                    isInvalid={pointIsInvalid(point)}
                                />

                                <InputGroup.Append>
                                    {getActionDropdown(point, idx)}
                                </InputGroup.Append>

                                <Form.Control.Feedback type="invalid">
                                    {getValidationFeedback(point)}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form>
                    );
                })}
            </>
        );
    }

    function pointIsInvalid(point) {
        return !!getValidationFeedback(point);
    }

    function getValidationFeedback(point) {
        return null;
    }

    function getAddButton() {
        return null;
    }

    return (
        <div style={{ height: height, overflowY: 'auto', width: '100%' }}>
            {getCells()}
            {getAddButton()}
        </div>
    );
}

SpectrumControl.propTypes = {
    height: PropTypes.number,
};
