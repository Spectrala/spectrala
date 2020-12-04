import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReferenceSpectrumTools from './resultant_tools';
import SpectrumLine from '../spectrum_line';
import { useSelector } from 'react-redux';
import { selectValidateLiveResultantSpectrum } from '../../../reducers/resultant_spectrum';

export default function ResultantSpectrumChart({ height }) {

    const data = useSelector(selectValidateLiveResultantSpectrum);
    
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
                Resultant Spectrum
            </Card.Header>
        );
    }
    
    return (
        <Row style={{ justifyContent: 'center', display: 'flex' }}>
            <Col lg={8}>
                <Card>
                    {getHeader()}
                    { isCollapsed() ? null : (<div style={{ height: height }}>
                        <SpectrumLine height={height} spectrumData={data}/>
                    </div>)}
                </Card>
            </Col>
            <Col xs={1}  lg={3}>
                <ReferenceSpectrumTools height={height} isCollapsed={isCollapsed()}/>
            </Col>
        </Row>
    );
}

ResultantSpectrumChart.propTypes = {
    height: PropTypes.number,
};
