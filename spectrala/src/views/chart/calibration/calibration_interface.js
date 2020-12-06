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
        <Row
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Col
                style={{ paddingBottom: '1vh' }}
                xl={8}
                lg={8}
                md={6}
                sm={12}
                xs={12}
            >
                <Card>
                    {getHeader()}
                    {isCollapsed() ? null : (
                        <div style={{ height: height }}>
                            <CalibrationLine />
                        </div>
                    )}
                </Card>
            </Col>
            <Col
                style={{ paddingBottom: '1vh' }}
                xl={4}
                lg={4}
                md={6}
                sm={12}
                xs={12}
            >
                <CalibrationPointsControl
                    height={height}
                    isCollapsed={isCollapsed()}
                />
            </Col>
        </Row>
    );
}

CalibrationSpectrumChart.propTypes = {
    height: PropTypes.number,
};
