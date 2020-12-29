import React, { useCallback } from 'react';
import {
    Card,
    InputGroup,
    Dropdown,
    Button,
    Form,
    Row,
    DropdownButton,
    FormControl,
} from 'react-bootstrap';
import { XCircle, Pencil, PlusCircle, ThreeDots} from 'react-bootstrap-icons';
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

import {
    cardStyle,
    cardHeaderStyle,
    secondaryButton,
} from '../../theme/styles';
import theme from '../../theme/theme';

export default function CalibrationPointsControl({
    height,
    maximumPoints,
    isCollapsed,
    canPlace,
    canConfig,
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
            if (!canPlace) return <InputGroup.Text><ThreeDots/></InputGroup.Text>;
            var description = CalibPt.getPlacementStatusDescription(point);
            if (description['isBeingPlaced']) {
                return (
                    <Button
                        variant="outline-secondary"
                        style={secondaryButton}
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
                    style={secondaryButton}
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
                        style={secondaryButton}
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
                    <InputGroup >
                        <InputGroup.Prepend>
                            {getPrependedGroup(point, idx)}
                        </InputGroup.Prepend>
                        <FormControl
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
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) e.preventDefault();
                            }}
                            isInvalid={pointIsInvalid(point)}
                        />

                        <InputGroup.Append>
                            {getEditButton(point, idx)}
                            <Button
                                variant="outline-secondary"
                                style={secondaryButton}
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
        <Card style={cardStyle}>
            <Card.Header style={cardHeaderStyle} as="h5">
                <div>Set points</div>
                <div>
                    <Row style={{ paddingRight: theme.CARD_HEADER_PADDING }}>
                        {getAddButton()}
                        {getDropdown()}
                    </Row>
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
    canPlace: PropTypes.bool,
    canConfig: PropTypes.bool,
};

CalibrationPointsControl.defaultProps = {
    maximumPoints: 5,
};
