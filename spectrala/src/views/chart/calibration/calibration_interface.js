import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CalibrationPointsControl from './points_control';
import CalibrationLine from './calibration_line';

export default function CalibrationSpectrumChart({ height }) {
    function isCollapsed() {
        return false;
    }

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
            <Col>
                <Card>
                    {getHeader()}
                    {isCollapsed() ? null : (
                        <div style={{ height: height }}>
                            <CalibrationLine />
                        </div>
                    )}
                </Card>
            </Col>
            <Col xs={1} lg={3}>
                <CalibrationPointsControl height={height} isCollapsed={isCollapsed()}/>
            </Col>
        </Row>
    );
}

CalibrationSpectrumChart.propTypes = {
    height: PropTypes.number,
};
