import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReferenceSpectrumTools from './spectrum_tools';
import SpectrumLine from '../spectrum_line';
import { useSelector } from 'react-redux';
import { selectValidateLiveReferenceSpectrum } from '../../../reducers/reference_spectrum';

export default function ReferenceSpectrumChart({ height }) {

    const data = useSelector(selectValidateLiveReferenceSpectrum);
    
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
                Reference Spectrum
            </Card.Header>
        );
    }

    return (
        <Row style={{ justifyContent: 'center', display: 'flex' }}>
            <Col lg={8}>
                <Card>
                    {getHeader()}
                    <div style={{ height: height }}>
                        <SpectrumLine height={height} spectrumData={data}/>
                    </div>
                </Card>
            </Col>
            <Col xs={1} lg={3}>
                <ReferenceSpectrumTools height={height} />
            </Col>
        </Row>
    );
}

ReferenceSpectrumChart.propTypes = {
    height: PropTypes.number,
};
