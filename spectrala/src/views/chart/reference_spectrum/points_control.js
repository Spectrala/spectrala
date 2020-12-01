import React from 'react';
import {
    Card,
    InputGroup,
    Dropdown,
    Button,
    Form,
    DropdownButton,
} from 'react-bootstrap';
import { XCircle, Pencil } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
    record_reference,
    remove_reference,
    rename_reference,
    selectValidation,
    selectReferenceSpectrumChartData,
    selectRecordedReferences,
} from '../../../reducers/spectrum';

export default function ReferencePointsControl({ height, maximumPoints }) {
    // TODO: Don't simply return false, bro
    const calibrationPoints = useSelector(
        selectCalibrationPoints,
        (a, b) => false
    );
    const dispatch = useDispatch();

    function isDuplicateWavelength(wavelength) {
        if (wavelength === null || wavelength === '') return false;
        return calibrationPoints.every(
            (point) => point.getWavelength() !== wavelength
        );
    }

    function getCalibrationBoxes() {
        return (
            <>
                <div style={{ height: '15px' }} />
                {calibrationPoints.map((point, idx) => {
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
                                    {getPrependedGroup(point, idx)}
                                </InputGroup.Prepend>
                                <Form.Control
                                    value={
                                        point.wavelength ? point.wavelength : ''
                                    }
                                    aria-label={`Calibration point ${idx + 1}`}
                                    aria-describedby="basic-addon2"
                                    onChange={(event) => {
                                        dispatch(
                                            modifyWavelength({
                                                targetIndex: idx,
                                                value: parseInt(
                                                    event.target.value
                                                ),
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
                                                removePoint({
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
        if (point.wavelengthIsEmpty()) {
            return null;
        } else if (!point.wavelengthIsValid()) {
            return `Select a wavelength between ${MINIMUM_WAVELENGTH} and ${MAXIMUM_WAVELENGTH}`;
        } else if (isDuplicateWavelength(point.getWavelength())) {
            return 'Duplicated wavelength found.';
        }
    }

    function getPrependedGroup(point, idx) {
        var description = point.getPlacementStatusDescription();
        if (description['isBeingPlaced']) {
            return (
                <Button
                    variant="outline-secondary"
                    onClick={() => dispatch(cancelPlace({ targetIndex: idx }))}
                >
                    Placing
                </Button>
            );
        } else if (description['hasBeenPlaced']) {
            return <InputGroup.Text>Done</InputGroup.Text>;
        }
        return (
            <Button
                variant="outline-secondary"
                disabled={!point.wavelengthIsValid()}
                onClick={() => dispatch(beginPlace({ targetIndex: idx }))}
            >
                Place
            </Button>
        );
    }

    function getEditButton(point, idx) {
        if (point.hasBeenPlaced() && point.wavelengthIsValid()) {
            return (
                <Button
                    variant="outline-secondary"
                    onClick={() => {
                        dispatch(
                            editPlacement({
                                targetIndex: idx,
                            })
                        );
                    }}
                >
                    <Pencil
                        style={{ display: 'flex', alignSelf: 'flex-center' }}
                    />
                </Button>
            );
        }
        return null;
    }

    function getAddButton() {
        if (!(calibrationPoints.length < maximumPoints)) {
            return;
        }
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
            >
                <Button
                    variant="outline-secondary"
                    onClick={() => dispatch(addOption())}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    Add point
                </Button>
            </div>
        );
    }

    return (
        <Card style={{ width: '100%' }}>
            <Card.Header
                as="h5"
                style={{
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
            >
                Set points
            </Card.Header>
            <div style={{ height: height }}>
                {getCalibrationBoxes()}
                {getAddButton()}
            </div>
        </Card>
    );
}

CalibrationPointsControl.propTypes = {
    height: PropTypes.number,
};
