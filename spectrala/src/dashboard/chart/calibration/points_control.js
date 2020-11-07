import React from 'react';
import {
    Card,
    InputGroup,
    FormControl,
    Dropdown,
    Button,
    Form,
    DropdownButton,
} from 'react-bootstrap';
import { XCircle, Pencil } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import CalibrationConstants from './helper_classes/calibration_constants';
const calibration_constants = new CalibrationConstants();

export default class CalibrationPointsControl extends React.Component {
    getCalibrationBoxes = () => {
        return (
            <>
                <div style={{ height: '15px' }} />
                {this.props.calibrationPoints.calibrationPoints.map(
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
                                        {this.getPrependedGroup(point, idx)}
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        value={
                                            point.wavelength
                                                ? point.wavelength
                                                : ''
                                        }
                                        aria-label={`Calibration point ${
                                            idx + 1
                                        }`}
                                        aria-describedby="basic-addon2"
                                        onChange={(event) => {
                                            this.props.calibrationPoints.setWavelength(
                                                point,
                                                event.target.value
                                            );
                                        }}
                                        isInvalid={this.pointIsInvalid(point)}
                                    />

                                    <InputGroup.Append>
                                        {this.getEditButton(point, idx)}
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => {
                                                this.props.calibrationPoints.removeOption(
                                                    idx
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
                                        {this.getValidationFeedback(point)}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form>
                        );
                    }
                )}
            </>
        );
    };

    pointIsInvalid = (point) => {
        return !!this.getValidationFeedback(point);
    }

    getValidationFeedback = (point) => {
        if (point.wavelengthIsEmpty()) {
            return null;
        } else if (!point.wavelengthIsValid()) {
            return `Select a wavelength between ${calibration_constants.MINIMUM_WAVELENGTH} and ${calibration_constants.MAXIMUM_WAVELENGTH}`;
        } else if (
            this.props.calibrationPoints.isDuplicateWavelength(
                point.getWavelength()
            )
        ) {
            return 'Duplicated wavelength found.';
        }
    };

    getPrependedGroup = (point, idx) => {
        var description = point.getPlacementStatusDescription();
        if (description['isBeingPlaced']) {
            return <InputGroup.Text>Placing</InputGroup.Text>;
        } else if (description['hasBeenPlaced']) {
            return <InputGroup.Text>Done</InputGroup.Text>;
        }
        return (
            <Button
                variant="outline-secondary"
                disabled={!point.wavelengthIsValid()}
                onClick={() => this.props.calibrationPoints.beginPlace(point)}
            >
                Place
            </Button>
        );
    };

    getEditButton = (point, idx) => {
        if (point.hasBeenPlaced() && point.wavelengthIsValid()) {
            return (
                <Button
                    variant="outline-secondary"
                    onClick={() => {
                        this.props.calibrationPoints.editOption(idx);
                    }}
                >
                    <Pencil
                        style={{ display: 'flex', alignSelf: 'flex-center' }}
                    />
                </Button>
            );
        }
        return null;
    };

    getAddButton = () => {
        if (
            !(this.props.calibrationPoints.length() < this.props.maximumPoints)
        ) {
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
                    onClick={this.props.calibrationPoints.addOption}
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
    };

    render() {
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
                    <DropdownButton
                        title="CFL Bulb"
                        variant="primary-link"
                        id="collasible-nav-dropdown"
                    >
                        <Dropdown.Item>Other option A</Dropdown.Item>
                        <Dropdown.Item>Other option B</Dropdown.Item>
                        <Dropdown.Item>Other option C</Dropdown.Item>
                    </DropdownButton>
                </Card.Header>
                <div style={{ height: this.props.height }}>
                    {this.getCalibrationBoxes()}
                    {this.getAddButton()}
                </div>
            </Card>
        );
    }
}

CalibrationPointsControl.propTypes = {
    height: PropTypes.number,
    maximumPoints: PropTypes.number,
    calibrationPoints: PropTypes.object.isRequired,
};

CalibrationPointsControl.defaultProps = {
    maximumPoints: 5,
};
