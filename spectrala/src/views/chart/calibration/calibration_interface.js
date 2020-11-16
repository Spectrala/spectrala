import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CalibrationPointsControl from './points_control';
import CalibrationLine from './calibration_line';
import CalibrationPoints from './helper_classes/calibration_points';
import CalibrationPoint from './helper_classes/calibration_point';

export default class SpectrumChart extends React.Component {
    state = {
        calibrationPoints: new CalibrationPoints(
            [
                new CalibrationPoint(303, 0.3670886075949367, false),
                new CalibrationPoint(421, null, true),
            ],
            () => this.onCalibrationPointChange()
        ),
    };

    componentDidMount() {
        this._ismounted = true;
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    onCalibrationPointChange = () => {
        // The value is already changed, just need to trigger the refresh.
        // Force refresh is not reccomended, so this will do the trick.
        if (this._ismounted) {
            this.setState({ calibrationPoints: this.state.calibrationPoints });
        }
        
    };

    getHeader = () => {
        return (
            <Card.Header
                as="h5"
                style={{
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
            >
                Calibration
            </Card.Header>
        );
    };

    render() {
        return (
            <Row style={{ justifyContent: 'center', display: 'flex' }}>
                <Col xs lg={8}>
                    <Card>
                        {this.getHeader()}
                        <div style={{ height: this.props.height }}>
                            <CalibrationLine
                                cameraFeed={this.props.cameraFeed}
                                calibrationPoints={this.state.calibrationPoints}
                            />
                        </div>
                    </Card>
                </Col>
                <Col xs lg={3}>
                    <CalibrationPointsControl
                        height={this.props.height}
                        calibrationPoints={this.state.calibrationPoints}
                    />
                </Col>
            </Row>
        );
    }
}

SpectrumChart.propTypes = {
    height: PropTypes.number,
    cameraFeed: PropTypes.object,
};
