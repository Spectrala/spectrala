import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CalibrationPointsControl from './calibration_points_control';
import CalibrationLine from './calibration_line';
import { cardStyle, cardHeaderStyle } from '../../theme/styles';

export default function CalibrationSpectrumChart({ height, showsChart, showsTool, canPlace, canConfig }) {
    function isCollapsed() {
        return false;
    }

    function getHeader() {
        return (
            <Card.Header as="h5" style={cardHeaderStyle}>
                Calibration
            </Card.Header>
        );
    }

    function getCalibChart() {
        if (!showsChart) return null;
        return (
            <Col
                style={{ paddingBottom: '1vh' }}
                xl={8}
                lg={8}
                md={6}
                sm={12}
                xs={12}
            >
                <Card style={cardStyle}>
                    {getHeader()}
                    {isCollapsed() ? null : (
                        <div style={{ height: height }}>
                            <CalibrationLine />
                        </div>
                    )}
                </Card>
            </Col>
        );
    }

    function getCalibPointsTool() {
        if (!showsTool) return null;
        return (
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
                    canPlace={canPlace}
                    canConfig={canConfig}
                />
            </Col>
        );
    }

    return (
        <Row
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {getCalibChart()}
            {getCalibPointsTool()}
        </Row>
    );
}

CalibrationSpectrumChart.propTypes = {
    height: PropTypes.number,
    showsChart: PropTypes.bool,
    showsTool: PropTypes.bool,
};
