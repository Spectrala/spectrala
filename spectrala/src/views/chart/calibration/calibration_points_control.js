import React, { useCallback } from 'react';
import {
    Card,
    InputGroup,
    Dropdown,
    Button,
    Form,
    DropdownButton,
} from 'react-bootstrap';
import { XCircle, Pencil, PlusCircle } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import {
    MINIMUM_WAVELENGTH,
    MAXIMUM_WAVELENGTH,
    currentAndOtherCalibrationPresets,
    presetOfTitle,
} from '../../../reducers/calibration/calibration_constants';
import * as CalibPt from '../../../reducers/calibration/calibration_point';

import { useDispatch, useSelector } from 'react-redux';
import {
    selectCalibrationPoints,
    modifyWavelength,
    removePoint,
    addOption,
    beginPlace,
    cancelPlace,
    editPlacement,
    setCalibrationPoints,
    setPreset,
} from '../../../reducers/calibration/calibration';

import { ItemTypes } from '../../draggable/item_types';
import DraggableTable from '../../draggable/draggable_table';

export default function CalibrationPointsControl({
    height,
    maximumPoints,
    isCollapsed,
}) {
    // TODO: Don't simply return false, bro
    const calibrationPoints = useSelector(
        selectCalibrationPoints,
        (a, b) => false
    );
    const dispatch = useDispatch();

    const isDuplicateWavelength = useCallback(
        (wavelength) => {
            if (wavelength === null || wavelength === '') return false;
            return calibrationPoints.every(
                (point) => CalibPt.getWavelength(point) !== wavelength
            );
        },
        [calibrationPoints]
    );

    const getValidationFeedback = useCallback(
        (point) => {
            if (CalibPt.wavelengthIsEmpty(point)) {
                return null;
            } else if (!CalibPt.wavelengthIsValid(point)) {
                return `Select a wavelength between ${MINIMUM_WAVELENGTH} and ${MAXIMUM_WAVELENGTH}`;
            } else if (isDuplicateWavelength(CalibPt.getWavelength(point))) {
                return 'Duplicated wavelength found.';
            }
        },
        [isDuplicateWavelength]
    );

    const pointIsInvalid = useCallback(
        (point) => {
            return !!getValidationFeedback(point);
        },
        [getValidationFeedback]
    );

    const getPrependedGroup = useCallback(
        (point, idx) => {
            var description = CalibPt.getPlacementStatusDescription(point);
            if (description['isBeingPlaced']) {
                return (
                    <Button
                        variant="outline-secondary"
                        onClick={() =>
                            dispatch(cancelPlace({ targetIndex: idx }))
                        }
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
                    disabled={!CalibPt.wavelengthIsValid(point)}
                    onClick={() => dispatch(beginPlace({ targetIndex: idx }))}
                >
                    Place
                </Button>
            );
        },
        [dispatch]
    );

    const getEditButton = useCallback(
        (point, idx) => {
            if (
                CalibPt.hasBeenPlaced(point) &&
                CalibPt.wavelengthIsValid(point)
            ) {
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
                            style={{
                                display: 'flex',
                                alignSelf: 'flex-center',
                            }}
                        />
                    </Button>
                );
            }
            return null;
        },
        [dispatch]
    );

    const getCell = useCallback(
        (point, idx) => {
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
                            value={point.wavelength ? point.wavelength : ''}
                            aria-label={`Calibration point ${idx + 1}`}
                            aria-describedby="basic-addon2"
                            onChange={(event) => {
                                dispatch(
                                    modifyWavelength({
                                        targetIndex: idx,
                                        value: parseInt(event.target.value),
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
        },
        [
            getPrependedGroup,
            dispatch,
            pointIsInvalid,
            getValidationFeedback,
            getEditButton,
        ]
    );

    const onReorder = useCallback(
        (list) => {
            dispatch(
                setCalibrationPoints({
                    value: list,
                })
            );
        },
        [dispatch]
    );

    const getKey = useCallback((point) => {
        return point.key;
    }, []);

    const getCalibrationBoxes = useCallback(() => {
        return (
            <DraggableTable
                list={calibrationPoints}
                getCell={getCell}
                getKey={getKey}
                onReorder={onReorder}
                itemType={ItemTypes.CALIBRATION_POINT_CELL}
            />
        );
    }, [calibrationPoints, getCell, getKey, onReorder]);

    function getAddButton() {
        if (!(calibrationPoints.length < maximumPoints)) {
            return;
        }
        return (
            <Button variant="outline" onClick={() => dispatch(addOption())}>
                <PlusCircle
                    style={{ display: 'flex', alignSelf: 'flex-center' }}
                />
            </Button>
        );
    }

    function getDropdown() {
        const presets = currentAndOtherCalibrationPresets(calibrationPoints);
        return (
            <DropdownButton
                title={presets.current.title}
                variant="primary-link"
                id="collasible-nav-dropdown"
            >
                {presets.other.map((preset, idx) => {
                    return (
                        <Dropdown.Item
                            key={idx}
                            onClick={() => {
                                dispatch(
                                    setPreset({
                                        preset: preset,
                                    })
                                );
                            }}
                        >
                            {preset.title}
                        </Dropdown.Item>
                    );
                })}
                <Dropdown.Divider />
                <Dropdown.Item
                    onClick={() => {
                        dispatch(
                            setPreset({
                                preset: presetOfTitle(presets.current.title),
                            })
                        );
                    }}
                >
                    Reset {presets.current.title}
                </Dropdown.Item>
            </DropdownButton>
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
                <div
                    style={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    {getAddButton()}
                    {getDropdown()}
                </div>
            </Card.Header>
            {isCollapsed ? null : (
                <div style={{ height: height, overflowY: 'auto' }}>
                    {getCalibrationBoxes()}
                </div>
            )}
        </Card>
    );
}

CalibrationPointsControl.propTypes = {
    height: PropTypes.number,
    maximumPoints: PropTypes.number,
    isCollapsed: PropTypes.bool,
};

CalibrationPointsControl.defaultProps = {
    maximumPoints: 5,
};
