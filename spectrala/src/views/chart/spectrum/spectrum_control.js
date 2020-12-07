import React from 'react';
import { InputGroup, Button, Form } from 'react-bootstrap';
import { XCircle, Droplet, CaretDown, CaretUp } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
    renameSpectrum,
    selectRecordedSpectra,
    removeSpectrum,
} from '../../../reducers/spectrum';

export default function SpectrumControl({ height }) {
    const dispatch = useDispatch();
    const recordedSpectra = useSelector(selectRecordedSpectra);

    function getCells() {
        return (
            <>
                <div style={{ height: '15px' }} />
                {recordedSpectra.map((point, idx) => {
                    return (
                        <Form
                            className="mb-3"
                            key={idx}
                            style={{
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                display: 'flex',
                            }}
                        >
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => {
                                            console.log('reference');
                                        }}
                                    >
                                        <Droplet
                                            style={{
                                                display: 'flex',
                                                alignSelf: 'flex-center',
                                            }}
                                        />
                                    </Button>
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
                                    {getUpDown(point, idx)}
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => {
                                            dispatch(
                                                removeSpectrum({
                                                    targetIndex: idx,
                                                })
                                            );
                                        }}
                                    >
                                        <XCircle
                                            style={{
                                                display: 'flex',
                                                alignSelf: 'flex-center',
                                            }}
                                        />
                                    </Button>
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

    function getUpDown(point, idx) {
        return (
            <>
                <Button
                    variant="outline-secondary"
                >
                    <CaretUp
                        style={{ display: 'flex', alignSelf: 'flex-center' }}
                    />
                </Button>
                <Button
                    variant="outline-secondary"
                >
                    <CaretDown
                        style={{ display: 'flex', alignSelf: 'flex-center' }}
                    />
                </Button>
            </>
        );
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
