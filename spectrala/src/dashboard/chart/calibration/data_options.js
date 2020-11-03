import React from 'react';
import {
    Card,
    InputGroup,
    FormControl,
    Dropdown,
    Button,
    DropdownButton,
} from 'react-bootstrap';
import { XCircle, Pencil } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import CalibrationPoint from './calibration_point';

export default class CalibrationPointsControl extends React.Component {
    state = {
        calibrationPoints: this.props.calibrationPoints,
    };
    getCalibrationBoxes = () => {
        return (
            <>
                <div style={{ height: '15px' }} />
                {this.state.calibrationPoints.map((point, idx) => {
                    return (
                        <InputGroup
                            className="mb-3"
                            key={idx}
                            style={{
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                display: 'flex',
                            }}
                        >
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    {point.getDescription()}
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={point.wavelength ? point.wavelength : ''}
                                aria-label={`Calibration point ${idx + 1}`}
                                aria-describedby="basic-addon2"
                                onChange={(event) => {
                                    var points = this.state.calibrationPoints;
                                    points[idx].setWavelength(event.target.value);
                                    this.setState({
                                        calibrationPoints: points,
                                    });
                                }}
                                isInvalid={!point.wavelengthIsValid()}
                            />

                            <InputGroup.Append>
                                {this.getEditButton(point, idx)}
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => {
                                        this.removeOption(idx);
                                    }}
                                >
                                    <XCircle style={{display: 'flex', alignSelf: 'flex-center'}}/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    );
                })}
            </>
        );
    };

    getEditButton = (point, idx) => {
        if (point.hasBeenPlaced() && point.wavelengthIsValid()) {
            return (
                <Button
                    variant="outline-secondary"
                    onClick={() => {
                        this.editOption(idx);
                    }}
                >
                    <Pencil style={{display: 'flex', alignSelf: 'flex-center'}}/>
                </Button>
            );
        }
        return null;
    }


    isCurrentlyPlacing = () => {
        var isPlacing = false
        this.state.calibrationPoints.map((point, idx) => {
            if (point.isBeingPlaced) {
                isPlacing = true;
            }
        });
        return isPlacing;
    }

    removeOption = (idx) => {
        var points = this.state.calibrationPoints;
        points.splice(idx, 1);
        this.setState({ calibrationPoints: points });
    };

    addOption = () => {
        var points = this.state.calibrationPoints;
        points.push(new CalibrationPoint(null, null, false));
        this.setState({ calibrationPoints: points });
    };

    editOption = (idx) => {
        var points = this.state.calibrationPoints;
        points.map((point) => point.setPlacementStatus(false))
        points[idx].setPlacementStatus(true)
        points[idx].setPlacement(null)
        this.setState({ calibrationPoints: points });
    }

    getAddButton = () => {
        if (!(this.state.calibrationPoints.length < this.props.maximumPoints)) {
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
                    onClick={this.addOption}
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
            <Card>
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
                    Set calibration points
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
    calibrationPoints: PropTypes.array,
};

CalibrationPointsControl.defaultProps = {
    maximumPoints: 5,
    calibrationPoints: [
        new CalibrationPoint(303, 0.8, false),
        new CalibrationPoint(421, null, true),
    ],
};
