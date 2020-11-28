import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SpectrumTools from './spectrum_tools';
import SpectrumLine from './spectrum_line';

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
                Spectrum
            </Card.Header>
        );
    }

    return (
        <Row style={{ justifyContent: 'center', display: 'flex' }}>
            <Col xs lg={8}>
                <Card>
                    {getHeader()}
                    <div style={{ height: height }}>
                        <SpectrumLine height={height}/>
                    </div>
                </Card>
            </Col>
            <Col xs lg={3}>
                <SpectrumTools height={height} />
            </Col>
        </Row>
    );
}

SpectrumChart.propTypes = {
    height: PropTypes.number,
};
