import React from 'react';
import {
    InputGroup,
    Button,
    Form,
} from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
    remove_reference,
    rename_reference,
    selectRecordedReferences,
} from '../../../reducers/reference_spectrum';

export default function ReferencePointsControl({ height }) {
    // TODO: Don't simply return false, bro
    const referenceSpectra = useSelector(
        selectRecordedReferences,
        (a, b) => false
    );
    const dispatch = useDispatch();

    function getCalibrationBoxes() {
        return (
            <>
                <div style={{ height: '15px' }} />
                {referenceSpectra.map((point, idx) => {
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
                                <Form.Control
                                    value={point.name ? point.name : ''}
                                    aria-label={`Calibration point ${idx + 1}`}
                                    aria-describedby="basic-addon2"
                                    onChange={(event) => {
                                        dispatch(
                                            rename_reference({
                                                targetIndex: idx,
                                                name: event.target.value,
                                            })
                                        );
                                    }}
                                    isInvalid={pointIsInvalid(point)}
                                />

                                <InputGroup.Append>
                                    {getEditButton(point, idx)}
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => {
                                            dispatch(
                                                remove_reference({
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

    function getEditButton(point, idx) {
        return null;
        /**return (
            <Button
                variant="outline-secondary"
                onClick={() => {
                    console.log('Edit');
                }}
            >
                <Pencil style={{ display: 'flex', alignSelf: 'flex-center' }} />
            </Button>
        ); */
    }

    function getAddButton() {
        return null;
    }

    return (
        <div style={{ height: height, overflowY:'auto', width: "100%"}}>
            {getCalibrationBoxes()}
            {getAddButton()}
        </div>
    );
}

ReferencePointsControl.propTypes = {
    height: PropTypes.number,
};
