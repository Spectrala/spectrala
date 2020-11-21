import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CalibrationPointsControl from './points_control';
import CalibrationLine from './calibration_line';

export default function SpectrumChart({ height }) {
    function getHeader() {
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
    }

    return (
        <Row style={{ justifyContent: 'center', display: 'flex' }}>
            <Col xs lg={8}>
                <Card>
                    {getHeader()}
                    <div style={{ height: height }}>
                        <CalibrationLine/>
                    </div>
                </Card>
            </Col>
            <Col xs lg={3}>
                <CalibrationPointsControl height={height} />
            </Col>
        </Row>
    );
}

SpectrumChart.propTypes = {
    height: PropTypes.number,
};
