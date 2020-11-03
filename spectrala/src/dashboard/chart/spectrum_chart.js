import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CalibrationPointsControl from './calibration/data_options';
import { data } from './sample_data';
import CalibrationLine from './calibration/calibration_line';

export default class SpectrumChart extends React.Component {
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
                            <CalibrationLine rawData={data} />
                        </div>
                    </Card>
                </Col>
                <Col xs lg={3}>
                    <CalibrationPointsControl height={this.props.height} />
                </Col>
            </Row>
        );
    }
}

SpectrumChart.propTypes = {
    height: PropTypes.number,
};
