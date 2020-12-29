import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CalibrationPointsControl from './calibration_points_control';
import CalibrationLine from './calibration_line';
import { cardStyle, cardHeaderStyle } from '../../theme/styles';

export default function CalibrationSpectrumChart({
    height,
    showsChart,
    showsTool,
    canPlace,
    canConfig,
}) {
    function getHeader() {
        return (
            <Card.Header as="h5" style={cardHeaderStyle}>
                Calibration
            </Card.Header>
        );
    }

    function getCalibChart() {
        if (showsChart)
            return (
                <Col style={{ paddingBottom: '1vh' }} lg={8} md={6} xs={12}>
                    <Card style={cardStyle}>
                        {getHeader()}
                        <div style={{ height: height }}>
                            <CalibrationLine />
                        </div>
                    </Card>
                </Col>
            );
    }

    function getCalibPointsTool() {
        if (!showsTool) return null;
        return (
            <Col
                style={{ paddingBottom: '1vh' }}
                xl={canConfig ? 8 : 4}
                lg={canConfig ? 8 : 4}
                md={canConfig ? 8 : 6}
                sm={12}
                xs={12}
            >
                <CalibrationPointsControl
                    height={height}
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
